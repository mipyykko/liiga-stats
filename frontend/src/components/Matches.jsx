import React, { useState, useEffect, useMemo, useCallback } from 'react'
import moment from 'moment'
import _ from 'lodash'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'

import { makeStyles } from '@material-ui/core/styles';
import { 
  Select, 
  MenuItem, 
  Paper, 
  Grid, 
  Typography,
  LinearProgress
} from '@material-ui/core'
import {
  ArrowLeft, ArrowRight
} from '@material-ui/icons'
import ScrollMenu from 'react-horizontal-scrolling-menu'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: 0
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    height: 150,
    backgroundColor: '#A0A0A0',
  },
  gridListTile: props => ({
    flexWrap: 'nowrap',
    display: 'block',
    padding: '10px 10px 10px 10px',
    margin: '4px',
    minWidth: 120,
    maxWidth: 120,
    'font-size': '9px',
    color: props.status === 1 ? '#808080' : '#000000',
    backgroundColor: props.selected ? '#C0E0FF' : '#FFFFFF', // props.status === 4 ? '#E0E0E0' : '#FFFFFF',
    fontFamily: 'sans-serif',
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

const MatchTeamScore = ({ team, score, winner }) => { 
  const classes = useStyles({ winner })

  return (    
    <Grid container spacing={2} direction="row" alignItems="center">
      <Grid item xs={10}>
        <Typography variant="subtitle2" className={classes.matchTeam}>{team.name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle2" className={classes.matchScore}>{score}</Typography>
      </Grid>
    </Grid>
  )
}
const Match = ({ match }) => { 
  const classes = useStyles({ status: match.status })

  return(
    <Paper className={classes.gridListTile}>
      <Grid item xs={12} container direction="column">
        <MatchTeamScore team={match.home_team} score={match.status > 1 ? match.home_score : null} winner={match.home_score > match.away_score} />
        <MatchTeamScore team={match.away_team} score={match.status > 1 ? match.away_score : null} winner={match.away_score > match.home_score} />
        <Grid item xs>
          {moment(Number(match.date)).format('D.M.YYYY HH:mm')}
        </Grid>
      </Grid>
    </Paper>
  )
}

const Matches = React.memo((props) => { 
  console.log('rerender with', props)
  const [selected, setSelected] = useState(null)
  const [byRound, setByRound] = useState({})
  const [round, setRound] = useState(1)
  const { tournamentId, seasonId } = props

  const { data, loading } = useQuery(ALL_MATCHES, { variables: { tournament_id: tournamentId, season_id: seasonId }})

  const classes = useStyles()

  useEffect(() => {
    console.log('set byround effect run')
    if (!loading) {
      setByRound(_(data.matches).orderBy('date', 'asc').groupBy('round').reduce((acc, curr) => ({ ...acc, [curr[0].round]: `${curr[0].id}` }), {}))
      const newestMatch = _(data.matches).filter(match => match.status >= 4).orderBy('date', 'desc').get(0)
      setRound(`${newestMatch.round}`)
    }
  }, [loading, data.matches])

  useEffect(() => {
    console.log('set selected round effect run with', round)
    setSelected(byRound[round])
    console.log((data.matches || []).find(match => match.id === Number(byRound[round])))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round])

  const onSelect = (key) => setSelected(key)

  const menuItems = useMemo(() => {
    console.log('redoing menu items')
    
    return (
    (data.matches || []).map(match => (
      <Match
        key={match.id}
        match={match}
      />
    ))
  )}, [data.matches])

  const scrollToRandom = () => {
    const relem = _.sample(data.matches.map(m => m.id))
    setSelected(`${relem}`)
  } 

  /*      
*/
  return (
    <Grid container className={classes.root} spacing={2} direction="row" alignItems="center">
      {loading  
      ? <Grid item xs={12}><LinearProgress /></Grid>      
        : <React.Fragment>
          <Grid item xs={1}>
            <Select 
              value={round}
              onChange={e => setRound(e.target.value)}
            >
              {Object.keys(byRound).map(r => (<MenuItem key={`round-${r}`} value={r}>{r}</MenuItem>))}
            </Select>
          </Grid>
          <Grid item xs={11}>
            <ScrollMenu
              data={menuItems}
              scrollBy={1}
              arrowLeft={<ArrowLeft />}
              arrowRight={<ArrowRight />}
              onSelect={onSelect}
              selected={selected}
              scrollToSelected={true}
              hideSingleArrow={true}
              inertiaScrolling={true}
              transition={0.5}
            />
          </Grid>
        </React.Fragment>}
    </Grid>
  )
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

export default Matches