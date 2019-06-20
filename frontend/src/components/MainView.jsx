import React, {  useEffect, useCallback } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { SELECT_SEASON, SELECT_TOURNAMENT } from '../store/actions'

import { Container, Grid, Select, MenuItem } from '@material-ui/core'

import MatchList from './MatchList'
import MatchView from './MatchView'

import _ from 'lodash'

const MainView = (props) => {
  const dispatch = useDispatch()
  const seasonId = useSelector(state => state.season.id)
  const tournamentId = useSelector(state => state.tournament.id)
  const matchId = useSelector(state => state.match.id)

  const setSeason = useCallback((id) => dispatch({ type: SELECT_SEASON, payload: { id }}), [dispatch])
  const setTournament = useCallback((id) => dispatch({ type: SELECT_TOURNAMENT, payload: { id }}), [dispatch])

  const { data: seasonData, loading: seasonLoading } = useQuery(ALL_SEASONS)

  useEffect(() => {
    if (seasonLoading) {
      return
    }

    if (seasonData.seasons.length > 0) {
      const latestSeason = _.orderBy(seasonData.seasons, 'end_year', 'desc')[0]

      setTournament(latestSeason.tournament_id)
      setSeason(latestSeason.id)
    }
  }, [seasonId, tournamentId, setSeason, setTournament, seasonLoading, seasonData.seasons])

  return (
    <Container>
      <Grid container justify='flex-end'>
        <Select
          value={seasonId}
          onChange={e => setSeason(e.target.value)}
        >
          {(seasonData.seasons || []).map(s => (<MenuItem key={`${s.tournament_id}-${s.id}`} value={s.id}>{s.name}</MenuItem>))}
        </Select>
      </Grid>
      <Grid container justify='flex-start'>
        <MatchList tournamentId={tournamentId} seasonId={seasonId} />
      </Grid>
      <Grid container direction="column" justify='flex-start'>
        <MatchView />
      </Grid>
    </Container>
  )
}

// was: matchview matchid

const ALL_SEASONS = gql`
{
  seasons {
    id,
    name,
    tournament_id,
    end_year
  }
}
`

export default MainView
