import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  Paper
} from '@material-ui/core'
import ContainerDimensions from 'react-container-dimensions'
import pitchImage from '../../assets/Football_pitch_v2.svg'
import memoize from 'lodash/memoize'

const useQueries = (id) => {
  const tactics = useQuery(MATCH_TACTICS, { variables: { id }})
  const matchInfo = useQuery(MATCH_TEAMS, { variables: { id }})

  return { 
    data: { ...tactics.data, ...matchInfo.data }, 
    error: tactics.error || matchInfo.error,
    loading: tactics.loading || matchInfo.loading
  }
}


const isHomeAway = React.memo(({ id, data }) => data.match.home_team_info.id === id ? 'home' : 'away')

const MatchTactics = ({ id, second = 0 }) => {
  const { data, error, loading } = useQueries(id)
  const classes = useStyles()

  if (loading) {
    return null
  }

  if (error) {
    console.error(error)
    return null
  }

  const { match } = data

  const tactics = (data.tactics || []).filter(tactic => tactic.second === second)

  const teamInfo = {
    [match.home_team_id]: match['home_team_info'],
    [match.away_team_id]: match['away_team_info']
  }

  return (
    <Paper elevation={2}>
      <Grid container className={classes.root} justify='center'>
        <Grid item container xs={6} direction='row' className={classes.pitch}>
          <ContainerDimensions>
            {({ width, height }) => (
              <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height}>
                {tactics.map(player => {
                  const { player_id, team_id, match_player, position } = player
                  const shirtColor = mapColor(teamInfo[team_id].shirt_color)
                  const numberColor = mapColor(teamInfo[team_id].number_color)
                  const number = match_player[0].number
                  
                  return (
                    <PlayerIcon
                      containerWidth={width}
                      containerHeight={height}
                      key={`playericon-${player_id}`}
                      shirtColor={shirtColor}
                      numberColor={numberColor}
                      number={number}
                      position={position}
                      home={team_id === match.home_team_id}
                    />
                  )
                })}
              </svg>
            )}
          </ContainerDimensions>
        </Grid>
      </Grid>
    </Paper>
  )
}

const PlayerIcon = (props) => {
  const { containerHeight, containerWidth, position, number, home } = props

  const classes = useStyles({ ...props })

  if (position === 100) { 
    return null
  }

  const [x, y] = calculateCoordinates({
    position, 
    containerWidth,
    containerHeight, 
    home
  })  

  return (
    <g style={{ transform: `translate(${x}px, ${y}px)` }}>
      <circle 
        className={classes.playerCircle}
        cx={1} cy={1}  
        r='11' 
      />
      <circle
        className={classes.playerCircleHighlight}
        cx={1} cy={1}
        r='11' 
      />
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

const mapColor = memoize((color) => color.replace('0x', '#'))

const calculateCoordinates = memoize((props) => {
  const { containerWidth, containerHeight, position, home } = props

  const xpct = position % 10 / 7 * 0.5
  const ypct = Math.floor(position / 10) / 6

  const x = Math.round(containerWidth * xpct)
  const y = Math.round(containerHeight * ypct)

  return [home ? x : containerWidth - x, home ? y : containerHeight - y]
}) 

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
    //height: '100%',
    height: '276px',    
    width: '408px',
  },
  pitch: {
    margin: '0 auto',
    background: `url(${pitchImage}) center center no-repeat`,
    backgroundSize: '394px 254px',
    minWidth: '408px',
    minHeight: '276px',
    position: 'relative'    
  },
  playerCircle: {
    fill: props => props.shirtColor,
  },
  playerCircleHighlight: {
    fillOpacity: 0.0,
    "&:hover": {
      stroke: props => props.numberColor,
      strokeWidth: 2,
    }
  },
  playerNumber: {
    fill: props => props.numberColor,
    pointerEvents: 'none'
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
    home_team_id,
    away_team_id,
    home_team_info {
      ...MatchTeamDetails
    },
    away_team_info {
      ...MatchTeamDetails
    }
  }
}
`