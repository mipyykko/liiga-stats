import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import _ from 'lodash'
import { Player } from '../Player'
import { convertHalfSecToMinuteString } from '../../util'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { useSelector } from 'react-redux'

const MatchHeader = React.memo(() => {
  const id = useSelector(state => state.match.id)
  const { data: { match }, loading } = useQuery(MATCH_INFO, { variables: { id: id }})

  const classes = useStyles({
    homeNumberColor: hex2rgba(_.get(match, 'home_team_info.number_color', ''), 0.4),
    homeShirtColor: hex2rgba(_.get(match, 'home_team_info.shirt_color', ''), 0.4),
    awayNumberColor: hex2rgba(_.get(match, 'away_team_info.number_color'), 0.4),
    awayShirtColor: hex2rgba(_.get(match, 'away_team_info.shirt_color'), 0.4)
  })

  return (
    //<Paper elevation={2}>
      <Grid container item direction='row' justify='center' className={classes.matchHeaderBlock}>
        <MatchTeam match={match} team='home' />
        <MatchTeam match={match} team='away' />
      </Grid>
    //</Paper>
  )   
})

const Logo = React.memo(({ team, onClick = () => {} }) => {
  const classes = useStyles()

  return team ? <div onClick={onClick}><img src={team.logo} className={classes.img} alt={team.name} /></div> : null
})

const hex2rgba = (hex, alpha = 1) => {
  const [r, g, b] = (mapColor(hex).match(/\w\w/g) || []).map(x => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
}

const mapColor = (color) => (color || '').replace('0x', '#')

const MatchTeam = React.memo(({ match, team }) => { // had: players
  const classes = useStyles()
  const matchTeam = (match || {})[`${team}_team`]
  const color = mapColor(_.get(match, `${team}_team_info.number_color`, ''))
  const direction = `row${team === 'home' ? '' : '-reverse'}`

  console.log(color)

  return (
    <Grid item xs={5} container alignItems="flex-start" direction={direction} className={classes.header}>
      <Team color={color} team={matchTeam} direction={direction} onClick={() => console.log(matchTeam)} />
      <Grid item />
      <ScoreColumn team={team} match={match} /> 
    </Grid>
  )
})

const Team = React.memo(({ team, direction, onClick, color }) => {
  const classes = useStyles({ color })

  return team ? (
    <Grid item container xs={4} direction={direction} justify='center' alignItems='center'>
      <Logo team={team} onClick={onClick} />
      <Typography variant="h6" className={classes.team}>{team.name}</Typography>
    </Grid>
  ) : null
})

const ScoreColumn = React.memo(({ team, match }) => {
  if (!match) {
    return null 
  }

  const teamId = (match[`${team}_team`] || {}).id
  const goals = (match.goals || []).filter(goal => goal.type === 1 ? goal.team_id === teamId : goal.team_id !== teamId)
  const score = match[`${team}_score`]
  const home = team === 'home'

  return (
    <Grid item xs={6} container style={{ flexGrow: 1 }} alignItems="stretch" direction="column">
      <Score score={score} home={home} />
      {goals.map(goal => {
        const { scorer, type, standard } = goal
        const minute = convertHalfSecToMinuteString(goal.second, goal.half)

        return <Goal key={`goal-${scorer.id}-${minute}`} scorer={scorer} type={type} minute={minute} standard={standard} home={home} />
      })}
    </Grid>
  )  
})

const Score = React.memo(({ score, home }) => (
  <Grid item container alignItems="flex-start" style={{ height: '100%' }} justify={`flex-${home ? 'end' : 'start'}`}>
    <Typography variant="h1">{score}</Typography>
  </Grid>
))

const Goal = React.memo(({ scorer, type, standard, minute, home }) => {
  return (
    <Grid container spacing={1} justify={`flex-${home ? 'end' : 'start'}`} direction="row">
      <Grid item>
      <Typography variant="body2">
        {minute}.
      </Typography>
      </Grid>
      <Grid item>
        <Player data={scorer} onClick={() => console.log(scorer)} />
      </Grid>
      <Grid item>
        <Typography variant="body2">
          {type === 2 ? '(og)' : standard === 6 ? '(p)' : ''}
        </Typography>
      </Grid>
    </Grid>
  )
})

const MATCH_INFO = gql`
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

query findMatchInfo($id: Int!) {
  match(id: $id) {
    ...MatchDetails,
    home_team {
      ...TeamDetails,
    },
    away_team {
      ...TeamDetails
    },
    home_team_info {
      ...MatchTeamDetails
    },
    away_team_info {
      ...MatchTeamDetails
    },
    goals {
      ...GoalDetails,
      scorer {
        id,
        name,
        surname,
        display_name
      },
      assistant {
        id,
        name,
        surname,
        display_name
      }
    }
  }
}
`
export default MatchHeader