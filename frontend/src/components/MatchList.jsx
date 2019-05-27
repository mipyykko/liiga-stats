import React, { useState, useEffect, useMemo, useCallback } from 'react'
import moment from 'moment'
import _ from 'lodash'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { SELECT_MATCH } from '../store/actions'

import { makeStyles } from '@material-ui/core/styles';
import { 
  Select, 
  MenuItem, 
  Paper, 
  Grid, 
  Typography,
  LinearProgress,
  FormControl,
  FormHelperText
} from '@material-ui/core'
import { ArrowLeft, ArrowRight } from '@material-ui/icons'

import Slider from 'react-slick'

const MatchList = React.memo((props) => { 
  const [matchesByRound, setMatchesByRound] = useState({})
  const [round, setRound] = useState(1)
  const [slider, setSlider] = useState(null)

  const dispatch = useDispatch()
  const selected = useSelector(state => state.match.id)

  const setSelected = useCallback(
    (id) => (console.log(id), dispatch({ type: SELECT_MATCH, payload: { id }})),
    [dispatch]
  )

  const { tournamentId, seasonId } = props

  const { data, loading } = useQuery(ALL_MATCHES, { variables: { tournament_id: tournamentId, season_id: seasonId }})

  const classes = useStyles()

  useEffect(() => {
    // set the initial round to latest and selected match to first of that round 
    if (loading) {
      return
    }

    const firstMatchOfLatestRound = _(data.matches)
      .filter(match => match.status >= 4)
      .orderBy('date', 'desc')
      .get(0, {})

    console.log('first', firstMatchOfLatestRound)
    const roundMap = _(data.matches)
      .orderBy('date', 'asc')
      .groupBy('round')
      .reduce((obj, match) => ({ ...obj, [match[0].round]: match[0].id }), {})

    setMatchesByRound(roundMap)
    setRound(firstMatchOfLatestRound.round)
    setSelected(firstMatchOfLatestRound.id)
  }, [loading, data.matches])

  useEffect(() => {
    // scroll the match list to first match of round on change
    if (!slider) { 
      return
    }

    const roundIdx = (data.matches || []).findIndex(match => match.id === matchesByRound[round]) 
    slider.slickGoTo(roundIdx)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round])

  useEffect(() => {
    // add mouse wheel listener to the match list
    if (!slider) {
      return
    }

    let slickListDiv = document.getElementsByClassName('slick-list')[0]

    slickListDiv.addEventListener('wheel', event => {
      event.preventDefault()
      event.deltaY > 0 ? slider.slickNext() : slider.slickPrev()
    })
  }, [slider])

  const roundItems = useMemo(() => 
    Object.keys(matchesByRound || {}).map(r => 
      <MenuItem key={`round-${r}`} value={r}>
        {r}
      </MenuItem>
    ), [matchesByRound])

  const onRoundChange = (e) => setRound(e.target.value)

  return (
    <Grid container className={classes.root} spacing={2} direction="row" alignItems="center">
      {loading || !tournamentId || !seasonId 
      ? <Grid item xs={12}>
          <LinearProgress />
        </Grid>      
      : <React.Fragment>
          <Grid item xs={1}>
            <FormControl>
              <FormHelperText htmlFor='roundSelect'>round</FormHelperText>
              <Select 
                value={round}
                onChange={onRoundChange}
              >
                {roundItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={10} className={classes.slider}>
            <MatchSlider
              key={'slider'}
              matches={data.matches}
              selected={selected}
              onMatchClick={setSelected}
              slider={slider}
              setSlider={setSlider}
            />
          </Grid>
        </React.Fragment>
      }
    </Grid>
  )
})

const MatchTeamScore = React.memo(({ data: { name, score, winner }}) => { 
  const classes = useStyles({ winner })

  return (    
    <Grid container spacing={0} direction="row" alignItems="center">
      <Grid item container justify='flex-start' xs={10}>
        <Typography variant="subtitle2" className={classes.matchTeam}>{name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle2" className={classes.matchScore}>{score}</Typography>
      </Grid>
    </Grid>
  )
})

const Match = React.memo(({ match, selected, onClick }) => { 
  const classes = useStyles({ status: match.status, selected })

  const matchDetail = {
    home: {
      name: match.home_team.name,
      score: match.status > 1 ? match.home_score : null,
      winner: match.home_score > match.away_score,
    },
    away: {
      name: match.away_team.name,
      score: match.status > 1 ? match.away_score : null,
      winner: match.away_score > match.home_score,
    }
  }

  const date = moment(Number(match.date)).format('D.M.YYYY HH:mm')

  return (
    <Paper className={classes.matchTile} onMouseUp={() => onClick(match.id)} elevation={2}>
      <Grid item xs={12} container direction='column'>
        <MatchTeamScore data={matchDetail.home} />
        <MatchTeamScore data={matchDetail.away} />
        <Grid item xs>
          {date}
        </Grid>
      </Grid>
    </Paper>
  )
})

const MatchSlider = React.memo(({ matches, selected, slider, setSlider, onMatchClick }) => (
  <Slider
      ref={t => setSlider(t)}
      {...sliderSettings(slider)}
  >
    {(matches || []).map(match => (
      <React.Fragment key={`${match.id}`}>
        <Match
          match={match}
          selected={match.id === selected}
          onClick={onMatchClick} 
        />
      </React.Fragment>
    ))}
  </Slider>
))

const SliderArrow = React.memo((props) => {
  const { currentSlide, slideCount, className, onClick, slider, direction } = props

  const slidesToShow = slider 
    ? ((slider.props.responsive.find(p => p.breakpoint === slider.state.breakpoint) || {}).settings || slider.props).slidesToShow 
    : null
  const disabled = direction === 'right' 
    ? slidesToShow 
      ? currentSlide + slidesToShow >= slideCount : false 
      : currentSlide === 0
  const classes = useStyles({ disabled })

  const Component = direction === 'right' ? ArrowRight : ArrowLeft

  return <Component className={`${className} ${classes.arrow}`} onClick={onClick} />
})

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: '5px 0 5px 0',
    height: 100,
  },
  round: {
  },
  arrow: props => ({
    color: 'black', 
    display: props.disabled ? 'none' : '' 
  }),
  slider: {
    transform: 'translateZ(0)',
  },
  matchTile: props => ({
    flexWrap: 'nowrap',
    display: 'block',
    userSelect: 'none', 
    padding: '10px 10px 5px 5px',
    margin: '4px',
    minWidth: 100,
    maxWidth: 150,
    'font-size': '9px',
    color: props.status === 1 ? '#808080' : '#000000',
    backgroundColor: props.selected ? '#C0E0FF' : '#FFFFFF',
    border: props.selected ? ['1px solid #A0C0E0'] : '',
    '&:hover': {
      backgroundColor: props.selected ? '#B0D0F0' : '#E0F0FF',
      border: ['1px solid #A0C0E0'],
      //margin: '3px'
    }
  }),
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },
  matchTeam: props => ({
    fontWeight: props.winner ? 'bold' : 'initial'
  }),
  matchScore: props => ({
    fontWeight: props.winner ? 'bold' : 'initial'
  }),
  active: {
    backgroundColor: '#C0E0FF'
  }
})

const sliderSettings = (slider) => ({
  slidesToShow: 6,
  focusOnSelect: true,
  infinite: false,
  dots: false,
  nextArrow: <SliderArrow direction={'right'} slider={slider} />,
  prevArrow: <SliderArrow direction={'left'} slider={slider} />,
  swipeToSlide: true,
  //lazyLoad: 'progressive',
  centerPadding: '20px',
  rows: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 4,
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2
      }
    }
  ]
})

const ALL_MATCHES = gql`
query findMatchesBy($tournament_id: Float!, $season_id: Float!) {
  matches(orderBy: date, tournament_id: $tournament_id, season_id: $season_id) {
    id,
    home_team {
      name
    },
    away_team {
      name
    },
    home_score,
    away_score,
    round
    status,
    date
  }
}
`

export default MatchList