import React, { useState, useEffect, useMemo, useCallback } from 'react'
import _ from 'lodash'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { SELECT_MATCH } from '../../store/actions'

import { useStyles } from './styles';
import { 
  Select, 
  MenuItem, 
  Grid, 
  LinearProgress,
  FormControl,
  FormHelperText
} from '@material-ui/core'
import { MatchSlider } from './MatchSlider'

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