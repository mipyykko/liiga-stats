import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import _ from 'lodash'
import { Player } from '../Player'
import { convertHalfSecToMinuteString } from '../../util'

export const MatchHeader = React.memo((props) => {
  const { match } = props
  const classes = useStyles()

  if (!match.home_players) {
    return
  }

  const players = _.flatten(_.concat(([match.home_players, match.away_players]))).map(p => p.player).reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {})
  
  return (
    //<Paper elevation={2}>
      <Grid container item direction="row" justify="center" className={classes.matchHeaderBlock}>
        <MatchTeam match={match} team='home' players={players} />
        <MatchTeam match={match} team='away' players={players} />
      </Grid>
    //</Paper>
  )   
})

const Logo = React.memo(({ team, onClick = () => {} }) => {
  const classes = useStyles()

  return <div onClick={onClick}><img src={team.logo} className={classes.img} alt={team.name} /></div>
})

const MatchTeam = React.memo(({ match, team, players }) => {
  const matchTeam = match[`${team}_team`]
  const direction = `row${team === 'home' ? '' : '-reverse'}`

  return (
    <Grid item xs={5} container alignItems="flex-start" direction={direction}>
      <Team team={matchTeam} direction={direction} onClick={() => console.log(matchTeam)} />
      <Grid item />
      <ScoreColumn team={team} match={match} players={players} />
    </Grid>
  )
})

const Team = React.memo(({ team, direction, onClick }) => {
  return (
    <Grid item container xs={3} direction={direction} alignItems="center">
      <Logo team={team} onClick={onClick} />
      <Typography variant="h6">{team.name}</Typography>
    </Grid>
)})

const ScoreColumn = React.memo((props) => {
  const { team, match, players } = props
  const teamId = match[`${team}_team`].id
  const goals = match.goals.filter(goal => goal.type === 1 ? goal.team_id === teamId : goal.team_id !== teamId)
  const score = match[`${team}_score`]
  const home = team === 'home'

  return (
    <Grid item xs={6} container style={{ flexGrow: 1 }} alignItems="stretch" direction="column">
      <Score score={score} home={home} />
      {goals.map(goal => {
        const scorer = players[goal.scorer_id]
        const type = goal.type
        const minute = convertHalfSecToMinuteString(goal.second, goal.half)

        return <Goal key={`goal-${goal.scorer_id}-${minute}`} scorer={scorer} type={type} minute={minute} home={home} />
      })}
    </Grid>
  )  
})

const Score = React.memo(({ score, home }) => (
  <Grid item container alignItems="flex-start" style={{ height: '100%' }} justify={`flex-${home ? 'end' : 'start'}`}>
    <Typography variant="h1">{score}</Typography>
  </Grid>
))

const Goal = React.memo(({ scorer, type, minute, home }) => {
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
          {type === 2 ? 'og' : ''}
        </Typography>
      </Grid>
    </Grid>
  )
})

