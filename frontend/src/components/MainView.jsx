import React, { useState, useEffect, useMemo } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'

import { Container, Grid, Select, MenuItem } from '@material-ui/core'

import Matches from './Matches'

const MainView = (props) => {
  const [season, setSeason] = useState({})

  const { data: seasonData, loading: seasonLoading } = useQuery(ALL_SEASONS)

  const tournamentId = useMemo(() => season.tournament_id, [season])
  const seasonId = useMemo(() => season.id, [season])

  useEffect(() => {
    if (!seasonLoading && seasonData.seasons.length > 0) {
      console.log('set season')
      setSeason(seasonData.seasons[0])
    }
  }, [seasonLoading, seasonData.seasons])

  console.log('hmm', season.tournament_id, season.id)

  return (
    <Container>
      <Grid container justify='flex-end'>
        <Select
          value={season}
          onChange={e => setSeason(e.target.value)}
        >
          {(seasonData.seasons || []).map(s => (<MenuItem key={`${s.tournament_id}-${s.id}`} value={s}>{s.name}</MenuItem>))}
        </Select>
      </Grid>
      <Grid container justify='flex-start'>
        {tournamentId && seasonId && <Matches tournamentId={tournamentId} seasonId={seasonId} />}
      </Grid>
    </Container>
  )
}

const ALL_SEASONS = gql`
{
  seasons {
    id,
    name,
    tournament_id
  }
}
`

export default MainView
