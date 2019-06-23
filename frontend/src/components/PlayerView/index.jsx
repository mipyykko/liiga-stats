import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardMedia, CardContent, Grid, Typography, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const fields = {
  isi: 'InStat Index',
  mof: 'Minutes on field',
  g: 'Goals',
  a: 'Assists',
  s: 'Shots',
  st: 'Shots on target',
  p: 'Passes',
  pa: 'Accurate passes',
  pap: 'Accurate passes %',
  offs: 'Offsides',
  f: 'Fouls',
  fop: 'Fouls suffered',
  lb: 'Lost balls',
  t: 'Recovered balls',
  c: 'Challenges',
  cw: 'Challenges won',
  cwp: 'Challenges won %',
  d: 'Total distance',
  spda: 'Average speed',
  spdm: 'Maximum speed'
}

const PlayerView = () => {
  const matchId = useSelector(state => state.match.id)
  const id = useSelector(state => state.player.id)

  console.log(id, matchId)

  const { data, loading, error } = useQuery(PLAYER, {
    variables: { id, matchId }
  })

  if (loading) {
    return null
  }

  if (error) {
    console.log(error)
    return null
  }

  if (!data) {
    return null
  }

  const { matchPlayer } = data

  if (!matchPlayer) { return null }

  return (
    <Card>
      <PlayerInfo data={matchPlayer} />
      <PlayerStats data={matchPlayer} />
    </Card>
  )
}

const PlayerInfo = React.memo(({ data }) => {
  const classes = useStyles()

  return (
    <CardHeader 
      avatar={
        <img
          src={data.player.photo}
          className={classes.img}
          alt={data.player.display_name}
        />
      }
      title={
        <Typography variant='h4'>
          {`#${data.number} ${data.player.display_name}`}
        </Typography>
      }
    />
  )
})

const PlayerStats = ({ data }) => {
  return (
    <CardContent>
      {Object.keys(fields).map(key => (
        <Grid key={`stats-${data.player.id}-${key}`} container item xs={12} direction='row'>
          <Grid item xs={8}>
            <Typography variant="body2">{fields[key]}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">{data.statistics[key]}</Typography>
          </Grid>
        </Grid> 
      ))}
    </CardContent>
  )
}

const useStyles = makeStyles({
  img: {
    margin: 'auto',
    display: 'block',
    width: '150px',
    height: '150px',
    maxWidth: '100%',
    maxHeight: '150px'
  }
})

export default PlayerView

const PLAYER = gql`
  fragment MatchPlayerDetails on MatchPlayers {
    number
    team_id
    position_id
    player {
      id
      name,
      surname
      photo
      display_name
    }
    starting
  }

  fragment MatchPlayerStatisticDetails on MatchPlayerStatistics {
    isi 
    t
    fop 
    p
    pa  
    pap 
    g
    a 
    spdm 
    mof 
    s
    spda 
    offs 
    d
    f 
    lb 
    st 
    c 
    cw 
    cwp 
  }

  query findMatchPlayer($id: Int!, $matchId: Int!) {
    matchPlayer(player_id: $id, match_id: $matchId) {
      ...MatchPlayerDetails,
      statistics {
        ...MatchPlayerStatisticDetails
      }
    }
  }

`
