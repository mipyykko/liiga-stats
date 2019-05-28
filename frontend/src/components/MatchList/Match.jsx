import React from 'react'
import { Grid, Typography, Paper } from '@material-ui/core'
import moment from 'moment'
import { useStyles } from './styles'

const MatchTeamScore = React.memo(({ data: { name, score, winner }}) => { 
  const classes = useStyles({ winner })

  return (    
    <Grid container spacing={0} direction="row" alignItems="center">
      <Grid item container justify='flex-start' xs={10}>
        <Typography variant="subtitle2" className={classes.matchTeam}>{name}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle2" className={classes.matchScore}>{score}</Typography>
      </Grid>
    </Grid>
  )
})

export const Match = React.memo(({ match, selected, onClick }) => { 
  const classes = useStyles({ status: match.status, selected })

  const matchDetail = {
    home: {
      name: match.home_team.name,
      score: match.status > 1 ? match.home_score : null,
      winner: match.home_score > match.away_score,
    },
    away: {
      name: match.away_team.name,
      score: match.status > 1 ? match.away_score : null,
      winner: match.away_score > match.home_score,
    }
  }

  const date = moment(Number(match.date)).format('D.M.YYYY HH:mm')

  return (
    <Paper className={classes.matchTile} onMouseUp={() => onClick(match.id)} elevation={2}>
      <Grid item xs={12} container direction='column'>
        <MatchTeamScore data={matchDetail.home} />
        <MatchTeamScore data={matchDetail.away} />
        <Grid item xs>
          {date}
        </Grid>
      </Grid>
    </Paper>
  )
})
