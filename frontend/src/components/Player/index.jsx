import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export const Player = React.memo(
  ({ data, hover, onClick, onMouseEnter, onMouseLeave, fullName = false }) => {
    const classes = useStyles({ hover })

    return (
      <Typography
        variant="body2"
        className={classes.player}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {fullName ? `${data.name} ${data.surname}` : data.display_name}
      </Typography>
    )
  }
)

const useStyles = makeStyles({
  player: {
    color: props => (props.hover ? '#0000FF' : 'black'),
    '&:hover': {
      color: '#0000FF'
    }
  }
})
