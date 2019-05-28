import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: '5px 0 5px 0',
    height: 100,
  },
  round: {
  },
  arrow: props => ({
    color: 'black', 
    display: props.disabled ? 'none' : '' 
  }),
  slider: {
    transform: 'translateZ(0)',
  },
  matchTile: props => ({
    flexWrap: 'nowrap',
    display: 'block',
    userSelect: 'none', 
    padding: '10px 10px 5px 5px',
    margin: '4px',
    minWidth: 100,
    maxWidth: 150,
    'font-size': '9px',
    color: props.status === 1 ? '#808080' : '#000000',
    backgroundColor: props.selected ? '#C0E0FF' : '#FFFFFF',
    border: props.selected ? ['1px solid #A0C0E0'] : '',
    '&:hover': {
      backgroundColor: props.selected ? '#B0D0F0' : '#E0F0FF',
      border: ['1px solid #A0C0E0'],
      //margin: '3px'
    }
  }),
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },
  matchTeam: props => ({
    fontWeight: props.winner ? 'bold' : 'initial'
  }),
  matchScore: props => ({
    fontWeight: props.winner ? 'bold' : 'initial'
  }),
  active: {
    backgroundColor: '#C0E0FF'
  }
})
