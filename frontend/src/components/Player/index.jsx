import React from 'react'
import { Typography } from '@material-ui/core'

export const Player = React.memo(({ data, onClick, fullName = false }) => (
  <Typography variant="body2" onClick={onClick}>{fullName ? `${data.name} ${data.surname}` : data.display_name}</Typography>
))