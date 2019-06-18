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
  
  const { matchPlayers } = data

  if (!matchPlayers) {
    return null
  }

  console.log('match players', matchPlayers)
    // todo: subbed for/to, cards, goal/assist images on list
  return (
    <Paper elevation={2}>
      <Grid container>
        <LineUp data={matchPlayers.filter(mp => mp.team_id === mp.match.home_team_id)} />
        <LineUp data={matchPlayers.filter(mp => mp.team_id === mp.match.away_team_id)} />
      </Grid>
    </Paper>
  )
})

const LineUp = React.memo(({ team, data }) => {
  const classes = useStyles()

  const lineup = (data || []).sort(lineupComparator)

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
              <Goals data={entry.goals} />
              <Cards data={entry.cards} onClick={() => console.log('card', entry.player)}/>
            </Grid>  
            <Grid item xs={2} container justify='flex-end'>
              <Substitutions subIn={entry.substitution_in} subOut={entry.substitution_out} />
            </Grid>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  )
})

const Substitutions = React.memo(({ subIn, subOut }) => {
  if (!subIn && !subOut) {
    return null
  }

  return (
    <React.Fragment>
      {subIn.length > 0 ? <Typography variant="subtitle2">{convertHalfSecToMinuteString(subIn[0].second, subIn[0].half)}<KeyboardArrowUp fontSize='inherit' /></Typography> : null}
      {subOut.length > 0 ? <Typography variant="subtitle2">{convertHalfSecToMinuteString(subOut[0].second, subOut[0].half)}<KeyboardArrowDown fontSize='inherit' /></Typography> : null}
    </React.Fragment>
)})

const Cards = React.memo(({ data, onClick }) => {
  return (
    <React.Fragment>
      {data.map(card => {
        const time = convertHalfSecToMinuteString(card.second, card.half)

        return <Card key={`card-${card.id}`} type={card.type} time={time} onClick={onClick} />
      })}
    </React.Fragment>
  )
})

const Card = React.memo(({ type, time, onClick }) => {
  const classes = useStyles({ cardType: type })

  return (
    <React.Fragment>
      <Typography variant='subtitle2' className={classes.card} onClick={onClick}>&nbsp;&#9646;</Typography>
      <Typography variant='subtitle2' className={classes.time}>&nbsp;{time}</Typography>    
    </React.Fragment>
  )
})

const Goals = React.memo(({ data }) => (
  <React.Fragment>
    {data.map(goal => {
      const time = convertHalfSecToMinuteString(goal.second, goal.half)

      return <Goal key={`goal-${goal.second}`} standard={goal.standard} type={goal.type} time={time} />
    })}
  </React.Fragment>
))


const Goal = React.memo(({ type, standard, time }) => {
  const classes = useStyles({ goalType: type, standard })

  return (
    <React.Fragment>
      <Typography variant='subtitle2' className={classes.goal}>&nbsp;<span role='img' aria-label='goal'>&#9917;</span></Typography>
      <Typography variant='subtitle2' className={classes.time}>&nbsp;{time}</Typography>    
    </React.Fragment>
  )
})

const lineupComparator = (a, b) => {
  if (a.starting !== b.starting) {
    return a.starting && !b.starting ? -1 : 1
  }

  if (a.position_id % 10 !== b.position_id % 10) {
    // from gk to forward line
    return a.position_id % 10 - b.position_id % 10
  }

  // from right to left
  return Math.round(b.position_id / 10) - Math.round(a.position_id / 10)   
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
  goal: {
    color: props => props.goalType === 2 ? '#FF0000' : 'default',
    '&::after': props => props.standard === 6 ? {
      position: 'relative',
      left: '-0.6rem',
      content: '"P"',
      fontSize: '75%',
      textShadow: '-2px 0 2px white, 0 2px 2px white, 2px 0 2px white, 0 -2px 2px white',
      color: '#FF0000',
      fontWeight: 'bold',
      display: 'inline-block',
      width: '0.1em'
    } : null
  },
  card: props => ({
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
    color: props.cardType === 'rc' ? '#FF0000': '#FFFF00',
    '&::after': props.cardType === 'yrc' ? {
      position: 'relative',
      left: '-0.2em',
      color: '#FF0000',
      content: '"▮"',
      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
      display: 'inline-block',
      width: '0.3em'
    } : null
  }),
/*   time: props => (props.cardType === 'yrc' ? {
    position: 'relative',
    left: '-0.2em',
  } : {}),*/
})

const MATCH_LINEUPS = gql`
fragment CardDetails on MatchEvents {
  id,
  opponent_player {
    id,
    display_name
  },
  half,
  second,
  type
}

fragment SubDetails on MatchEvents {
  id,
  half,
  second
}

fragment SubPlayerDetails on Players {
  id,
  display_name
}

fragment MatchPlayerDetails on MatchPlayers {
  number, 
  team_id,
  position_id, 
  player {
    id,
    display_name
  },
  starting, 
}

fragment GoalDetails on Goals {
  assistant {
    id
  },
  standard,
  type,
  half,
  second,
}

query getMatchPlayers($id: Int!) {
  matchPlayers(match_id: $id) {
    ...MatchPlayerDetails,
    match {
      home_team_id,
      away_team_id
    },
    cards {
      ...CardDetails
    },
    substitution_in {
      ...SubDetails,
      player {
        ...SubPlayerDetails
      }
    },
    substitution_out {
      ...SubDetails,
      opponent_player {
        ...SubPlayerDetails
      }
    },
    goals {
      ...GoalDetails
    }
  }
}
`

/* 

fragment PlayerDetails on Players {
  id,
  name,
  surname,
  display_name,
  photo
}

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

*/
export default MatchLineups