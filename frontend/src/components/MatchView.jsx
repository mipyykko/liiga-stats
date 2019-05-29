import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  Paper
} from '@material-ui/core'
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons'
import { convertHalfSecToMinuteString } from '../util'

import { MatchHeader } from './MatchHeader'
import { Player } from './Player'

const MatchView = React.memo((props) => {
  const [match, setMatch] = useState({})
  const dispatch = useDispatch()

  const { matchId } = props

  const { data, loading } = useQuery(MATCH, { variables: { id: matchId }})

  const classes = useStyles()

  useEffect(() => {
    if (loading) {
      return
    }

    setMatch(data.match)
    console.log(data.match)
  }, [data.match, loading])

  return (
    <Grid container className={classes.root} spacing={2} direction="column">
      <MatchHeader match={match} />
      <LineUps match={match} />
    </Grid>
  )
})

const LineUps = React.memo(({ match }) => {
  if (!match.home_players) {
    return
  }

  const [homeLineup, awayLineup] = ['home', 'away']
    .map(team => match[`${team}_players`].sort(lineupComparator))
  const substitutions = (match.events || [])
    .filter(event => event.type === 'sub')
    .reduce((acc, curr) => ({
      ...acc,
      [curr.player_id]: { ...acc[curr.player_id], out: curr },
      [curr.opponent_player_id]: { ...acc[curr.opponent_player_id], in: curr }
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

const pos = { 31: 'GK', 12: 'LB', 22: 'LCB', 32: 'CB', 42: 'RCB', 52: 'RB', 13: 'LWB', 23: 'LDM', 33: 'CDM', 43: 'RDM', 53: 'RWB', 14: 'LM', 24: 'LCM', 34: 'CM', 44: 'RCM', 54: 'RM', 15: 'LW', 25: 'LAM', 35: 'AM', 45: 'RAM', 55: 'RW', 16: 'LF', 26: 'LCF', 36: 'CF', 46: 'RCF', 56: 'RF', 100: 'sub' }


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

const MATCH = gql`
fragment TeamDetails on Teams {
  id,
  name,
  display_name,
  country,
  logo
}

fragment TeamInfoDetails on MatchTeamInfos {
  number_color,
  shirt_color,
  coach_name,
  coach_surname
}

fragment PlayerDetails on Players {
  id,
  name,
  surname,
  display_name,
  photo
}

fragment MatchPlayerDetails on MatchPlayerStatistics {
  number, 
  position_id, 
  starting, 
  in_sub_second,
  out_sub_second,
  replaced_player_id, 
  replacement_player_id, 
  isi, 
  t, 
  fop, 
  p,
  pa,  
  pap, 
  g, 
  a, 
  spdm, 
  mof, 
  s, 
  spda, 
  offs, 
  d, 
  f, 
  lb, 
  st, 
  c, 
  cw, 
  cwp, 
}

fragment TeamStatisticDetails on MatchTeamStatistics {
  status,
  s,
  st,
  f,
  p,
  pa,
  pap,
  bpm,
  bpp,
  ck,
  c,
  cw,
  cwp,
  offs,
  yc,
  rc
}

fragment TeamTacticDetails on MatchTeamTactics {
  player_id,
  position,
  second
}

fragment GoalDetails on Goals {
  scorer_id, 
  assistant_id,
  team_id,
  opposing_team_id,
  half,
  second,
  standard,
  type,
  side,
  home_team_score,
  away_team_score,
  home_team_prev_score,
  away_team_prev_score
}

fragment MatchEventDetails on MatchEvents {
  id,
  match_id,
  team_id,
  player_id,
  opponent_player_id,
  action_code,
  parent_event_id,
  parent_event_action_code,
  standard,
  type,
  title,
  half,
  second,
  pos_x,
  pos_y,
  pos_dest_x,
  pos_dest_y,
  offset_left,
  video_url
}

fragment MatchDetails on Matches {
  id,
  tournament_id,
  season_id,
  round,
  date,
  status,
  min,
  width,
  height,
  home_team_id,
  away_team_id,
  home_score,
  away_score
}

query findMatch($id: Float!) {
  match(id: $id) {
    ...MatchDetails,
    home_team {
      ...TeamDetails
    },
    away_team {
      ...TeamDetails
    },
    home_team_info {
      ...TeamInfoDetails
    },
    away_team_info {
      ...TeamInfoDetails
    },
    home_players {
      player {
        ...PlayerDetails
      },
      ...MatchPlayerDetails
    },
    away_players {
      player {
        ...PlayerDetails
      },
      ...MatchPlayerDetails
    },
    home_statistics {
      ...TeamStatisticDetails
    },
    away_statistics {
      ...TeamStatisticDetails
    },
    home_team_tactics {
      ...TeamTacticDetails
    },
    away_team_tactics {
      ...TeamTacticDetails
    },
    goals {
      ...GoalDetails
    },
    events {
      ...MatchEventDetails
    }
  }
}
`
export default MatchView
