import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    display: 'block',
  },
  matchHeaderBlock: {
    //display: 'block',
    padding: '10px',
    background: props => `linear-gradient(to right, ${props.homeShirtColor}, white, white, white, ${props.awayShirtColor}) top left`,
    backgroundPosition: `top left; bottom left`
  },
  header: {
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  team: {
    // color: props => props.color,
    // textShadow: '-2px 0 2px white, 0 2px 2px white, 2px 0 2px white, 0 -2px 2px white',
  }
})
