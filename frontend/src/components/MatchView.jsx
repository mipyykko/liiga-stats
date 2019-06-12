import React from 'react'
import { gql } from 'apollo-boost'

import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
} from '@material-ui/core'

import MatchHeader from './MatchHeader'
import MatchLineups from './MatchLineups'


const MatchView = (props) => {
  const { matchId } = props

  const classes = useStyles()

  return (
    <Grid container className={classes.root} spacing={2} direction="column">
      <MatchHeader id={matchId} />
      <MatchLineups id={matchId} />
    </Grid>
  )
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

fragment MatchTeamDetails on MatchTeams {
  match_id,
  team_id,
  score,
  score_pen,
  number_color,
  shirt_color,
  coach_name,
  coach_surname
}

fragment MatchTeamStatisticDetails on MatchTeamStatistics {
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

fragment MatchTeamTacticDetails on MatchTeamTactics {
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

query findMatch($id: Int!) {
  match(id: $id) {
    ...MatchDetails,
    home_team {
      ...TeamDetails,
    },
    away_team {
      ...TeamDetails
    },
    home_team_info {
      ...MatchTeamDetails,
      statistics {
        ...MatchTeamStatisticDetails
      },
      tactics {
        ...MatchTeamTacticDetails
      }
    },
    away_team_info {
      ...MatchTeamDetails,
      statistics {
        ...MatchTeamStatisticDetails
      }
      tactics {
        ...MatchTeamTacticDetails
      }
    },
    goals {
      ...GoalDetails,
      scorer {
        id,
        display_name
      },
      assistant {
        id,
        display_name
      }
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

fragment MatchPlayerDetails on MatchPlayers {
  number, 
  position_id, 
  starting, 
  in_sub_second,
  out_sub_second,
  replaced_player_id, 
  replacement_player_id, 
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

fragment MatchPlayerStatisticDetails on MatchPlayerStatistics {
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

  home_players {
      ...MatchPlayerDetails,
      player {
        ...PlayerDetails
      },
      statistics {
        ...MatchPlayerStatisticDetails
      }
    },
    away_players {
      ...MatchPlayerDetails,
      player {
        ...PlayerDetails
      },
      statistics {
        ...MatchPlayerStatisticDetails
      }
    },
    
    events {
      ...MatchEventDetails
    }
*/
export default MatchView
