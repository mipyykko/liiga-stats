import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  Paper
} from '@material-ui/core'
import pitchImage from '../../assets/bg-field.png'

const useQueries = (id) => {
  const tactics = useQuery(MATCH_TACTICS, { variables: { id }})
  const matchInfo = useQuery(MATCH_TEAMS, { variables: { id }})

  return { 
    data: { ...tactics.data, ...matchInfo.data }, 
    error: tactics.error || matchInfo.error,
    loading: tactics.loading || matchInfo.loading
  }
}

const MatchTactics = ({ id }) => {
/*   const { data, error, loading } = useQuery(MATCH_TACTICS, { variables: { id }}) */
  const { data, error, loading } = useQueries(id)

  console.log(data)

  const classes = useStyles()

  if (loading) {
    return null
  }

  if (error) {
    console.log(error)
    return null
  }

  //const { match } = data

  return (
    <Paper elevation={2}>
      <Grid container className={classes.root} justify='center'>
        <Grid item container xs={6} direction='row' className={classes.pitch}>
        <MatchTactic team='home' data={data} />
        <MatchTactic team='away' data={data} />

        </Grid>
      </Grid>
    </Paper>

  )
}
/*
        <MatchTactic team='home' data={match} />
        <MatchTactic team='away' data={match} />
*/
const MatchTactic = ({ data, team }) => {
  const { shirt_color, number_color, team_id } = data.match[`${team}_team_info`]
  const { tactics } = data

  const classes = useStyles({ team })

  console.log(tactics)

  return (
    <Grid item xs={6} className={classes.lineup}>
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='125%'>
      {tactics
        .filter(tactic => tactic.second === 0 && tactic.team_id === team_id)
        .map(player => 
        <PlayerIcon
          key={player.player_id}
          shirtColor={mapColor(shirt_color)}
          numberColor={mapColor(number_color)}
          number={player.match_player[0].number}
          position={player.position}
          reverse={team === 'away'}
        /> 
      )}
      </svg>
    </Grid>
  )
}

const PlayerIcon = (props) => {
  const { position, number, reverse } = props

  const classes = useStyles({ ...props })

  if (position === 100) { 
    return null
  }
  const [x, y] = calculateCoordinates(position, reverse)  

  return (
    <g style={{ transform: `translate(${x}, ${y})` }}>
      <circle 
        className={classes.playerCircle}
        cx={1} cy={1}  
        r='11' />
      <text
        className={classes.playerNumber} 
        x={1} y={5} 
        textAnchor='middle' 
        fontSize='11'
      >
        {number}
      </text>
    </g>
  )
}

const mapColor = (color) => color.replace('0x', '#')

const calculateCoordinates = (pos, reverse) => {
  const pct = (val, max) => 5 + (val) / (max) * 90

  const xpos = pos % 10
  const ypos = Math.floor(pos / 10)

  const xpct = pct(reverse ? 7 - xpos : xpos, 6)
  const ypct = pct(reverse ? 6 - ypos : ypos, 5)

  return [`${xpct}%`, `${ypct}%`]
} 

export default MatchTactics

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: '5px 0 5px 0',
    backgroundColor: '#a3cd99'
  },
  lineup: {
    height: '100%'
  },
  pitch: {
    margin: '0 auto',
    height: '276px',    
    width: '408px',
    background: `url(${pitchImage}) center center no-repeat`,
    backgroundSize: '394px 254px',
    minWidth: '408px',
    minHeight: '276px',
    position: 'relative'    
  },
  playerCircle: {
    fill: props => props.shirtColor,
    "&:hover": {
      stroke: props => props.numberColor,
      strokeWidth: 2
    }
  },
  playerNumber: {
    fill: props => props.numberColor
  }
})

const MATCH_TACTICS = gql`
fragment MatchPlayerDetails on MatchPlayers {
  number,
  player {
    id,
    display_name
  }
}

fragment MatchTacticDetails on MatchTeamTactics {
  team_id,
  match_id,
  player_id,
  position,
  second
}

query findMatchTactics($id: Int!) {
  tactics: matchTeamTactics(match_id: $id) {
    ...MatchTacticDetails,
    match_player {
      ...MatchPlayerDetails
    }
  }
}
`

const MATCH_TEAMS = gql`
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

query findMatchTeams($id: Int!) {
  match(id: $id) {
    id,
    home_team_info {
      ...MatchTeamDetails
    },
    away_team_info {
      ...MatchTeamDetails
    }
  }
}
`
/*

    match_id,
    team_id,
    player_id,
    position,
    second,
    player {}
    home_team_info {
      ...MatchTeamDetails,
      tactics {
        ...MatchTacticDetails,
        match_player {
          ...MatchPlayerDetails
        }
      }
    },
    away_team_info {
      ...MatchTeamDetails,
      tactics {
        ...MatchTacticDetails,
        match_player {
          ...MatchPlayerDetails
        }
      }
    }
*/