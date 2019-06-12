import React, { useEffect, useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { makeStyles } from '@material-ui/core/styles'

import {
  Grid,
  Typography,
  Paper
} from '@material-ui/core'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import { convertHalfSecToMinuteString } from '../../util'
import { Player } from '../Player'

const MatchLineups = React.memo(({ id }) => {
  const { data, error, loading } = useQuery(MATCH_LINEUPS_SUBS, { variables: { id: id }})

  if (loading) {
    return null
  }

  if (error) {
    console.log(error)
    return null
  }

  const { lineupSubs } = data

  const [homeLineup, awayLineup] = ['home', 'away']
    .map(team => (lineupSubs[`${team}_players`] || []).sort(lineupComparator))
  const substitutions = (lineupSubs.substitutions || [])
    .reduce((acc, curr) => ({
      ...acc,
      [curr.player.id]: { ...acc[curr.player.id], out: curr },
      [curr.opponent_player.id]: { ...acc[curr.opponent_player.id], in: curr }
    }), {}) 
    // todo: subbed for/to, cards, goal/assist images on list


  return (
    <Paper elevation={2}>
      <Grid container>
        <LineUp data={homeLineup} substitutions={substitutions} />
        <LineUp data={awayLineup} substitutions={substitutions} />
      </Grid>
    </Paper>
  )
})

const LineUp = React.memo(({ data, substitutions }) => {
  const classes = useStyles()

  return (
    <Grid item xs={6}>
      {data.map((entry, index) => (
        <React.Fragment key={`lineup-${entry.player.id}`}>
          {index === 11 ? <hr /> : null}
          <Grid container>
            <Grid item xs={2}>
              {entry.number > 0 ? <Typography variant="subtitle2" className={classes.number}>{entry.number}</Typography> : null}
            </Grid>
            <Grid item xs={8} container justify='flex-start'>
              <Player data={entry.player} onClick={() => console.log(entry.player)} />
            </Grid>  
            <Grid item xs={2} container justify='flex-end'>
              <Substitutions data={substitutions} id={entry.player.id} />
            </Grid>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  )
})

const Substitutions = React.memo(({ data, id }) => {
  if (!data[id]) {
    return null
  }

  // TODO: this is stupid, fix
  return (
    <React.Fragment>
      {data[id].in ? <Typography variant="subtitle2">{convertHalfSecToMinuteString(data[id].in.second, data[id].in.half)}<KeyboardArrowUp fontSize='inherit' /></Typography> : null}
      {data[id].out ? <Typography variant="subtitle2">{convertHalfSecToMinuteString(data[id].out.second, data[id].out.half)}<KeyboardArrowDown fontSize='inherit' /></Typography> : null}
    </React.Fragment>
)})

const lineupComparator = (a, b) => {
  if (a.starting !== b.starting) {
    return a.starting && !b.starting ? -1 : 1
  }

  if (a.position_id % 10 !== b.position_id % 10) {
    return a.position_id % 10 - b.position_id % 10
  }

  return Math.round(a.position_id / 10) - Math.round(b.position_id / 10)   
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: '5px 0 5px 0',
  },
  lineups: {
    minWidth: 400,
    maxWidth: 400
  }
})

const MATCH_LINEUPS_SUBS = gql`
fragment SubstitutionDetails on MatchEvents {
  player {
    id,
    display_name
  },
  opponent_player {
    id,
    display_name
  },
  half,
  second
}

fragment MatchPlayerDetails on MatchPlayers {
  number, 
  position_id, 
  starting, 
  in_sub_second,
  out_sub_second,
  replaced_player_id, 
  replacement_player_id, 
}

fragment PlayerDetails on Players {
  id,
  name,
  surname,
  display_name,
  photo
}

query getLineupsSubs($id: Int!) {
  lineupSubs: match(id: $id) {
    id,
    substitutions: events(type: "sub") {
      ...SubstitutionDetails
    },
    home_players {
      ...MatchPlayerDetails,
      player {
        ...PlayerDetails
      }
    },
    away_players {
      ...MatchPlayerDetails,
      player {
        ...PlayerDetails
      }
    }
  }
}
`

export default MatchLineups