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
  const { data, error, loading } = useQuery(MATCH_LINEUPS, { variables: { id: id }})

  if (loading) {
    return null
  }

  if (error) {
    console.log(error)
    return null
  }

  const { match } = data
    // todo: subbed for/to, cards, goal/assist images on list
  return (
    <Paper elevation={2}>
      <Grid container>
        <LineUp team='home' data={match} />
        <LineUp team='away' data={match} />
      </Grid>
    </Paper>
  )
})

const LineUp = React.memo(({ team, data }) => {
  const classes = useStyles()

  const lineup = (data[`${team}_players`] || []).sort(lineupComparator)
  // TODO: done twice
  const substitutions = (data.events || [])
    .filter(e => e.type === 'sub')
    .reduce((acc, curr) => ({
      ...acc,
      [curr.player.id]: { ...acc[curr.player.id], out: curr },
      [curr.opponent_player.id]: { ...acc[curr.opponent_player.id], in: curr }
    }), {}) 
  const cards = (data.events || []).filter(e => e.type !== 'sub')

  return (
    <Grid item xs={6}>
      {lineup.map((entry, index) => (
        <React.Fragment key={`lineup-${entry.player.id}`}>
          {index === 11 ? <hr /> : null}
          <Grid container>
            <Grid item xs={2}>
              {entry.number > 0 ? <Typography variant="subtitle2" className={classes.number}>{entry.number}</Typography> : null}
            </Grid>
            <Grid item xs={8} container justify='flex-start'>
              <Player data={entry.player} onClick={() => console.log(entry.player)} />
              <Cards data={cards.filter(card => card.player.id === entry.player.id)} />
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

const Cards = React.memo(({ data }) => {
  return (
    <React.Fragment>
      {data.map(card => {
        const time = convertHalfSecToMinuteString(card.second, card.half)

        return <Card key={`card-${card.id}`} type={card.type} time={time} />
      })}
    </React.Fragment>
  )
})

const Card = React.memo(({ type, time }) => {
  const classes = useStyles({ type })

  return (
    <React.Fragment>
      <Typography variant='subtitle2' className={classes.card}>&nbsp;&#9646;</Typography>
      <Typography variant='subtitle2' className={classes.time}>&nbsp;{time}</Typography>    
    </React.Fragment>
  )
})

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
  },
  card: props => ({
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    color: props.type === 'rc' ? '#FF0000': '#FFFF00',
    '&::after': props.type === 'yrc' ? {
      position: 'relative',
      left: '-0.2em',
      color: '#FF0000',
      content: '"▮"',
      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    } : null
  }),
  time: props => (props.type === 'yrc' ? {
    position: 'relative',
    left: '-0.2em',
  } : {})
})

const MATCH_LINEUPS = gql`
fragment EventDetails on MatchEvents {
  id,
  player {
    id,
    display_name
  },
  opponent_player {
    id,
    display_name
  },
  half,
  second,
  type
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
  match(id: $id) {
    id,
    events(typeIn: ["sub", "yc", "rc", "yrc"]) {
      ...EventDetails
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