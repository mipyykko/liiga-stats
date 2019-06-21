import React, { useCallback } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import pitchImage from '../../assets/Football_pitch_v2.svg'
import memoize from 'lodash/memoize'

import { SET_HOVER_PLAYER } from '../../store/actions'

const useQueries = id => {
  const tactics = useQuery(MATCH_TACTICS, { variables: { id } })
  const matchInfo = useQuery(MATCH_TEAMS, { variables: { id } })

  return {
    data: { ...tactics.data, ...matchInfo.data },
    error: tactics.error || matchInfo.error,
    loading: tactics.loading || matchInfo.loading
  }
}

const MatchTactics = ({ second = 0 }) => {
  const id = useSelector(state => state.match.id)
  const hoverPlayerId = useSelector(state => state.player.hoverId)
  const dispatch = useDispatch()

  const setHoverPlayer = useCallback(
    id => dispatch({ type: SET_HOVER_PLAYER, payload: { id } }),
    [dispatch]
  )

  const { data, error, loading } = useQueries(id)
  const classes = useStyles()

  if (loading) {
    return null
  }

  if (error) {
    console.error(error)
    return null
  }

  const { match } = data

  const tactics = (data.tactics || []).filter(
    tactic => tactic.second === second
  )

  const teamInfo = {
    [match.home_team_id]: match['home_team_info'],
    [match.away_team_id]: match['away_team_info']
  }

  return (
    <Paper elevation={2}>
      <Grid container className={classes.root} justify="center">
        <Grid item container xs={6} direction="row" justify="center">
          <svg
            className={classes.pitch}
            xmlns="http://www.w3.org/2000/svg" /*width={1.55 * height} height={height}*/
          >
            {tactics.map(player => {
              const { player_id, team_id, match_player, position } = player
              const shirtColor = mapColor(teamInfo[team_id].shirt_color)
              const numberColor = mapColor(teamInfo[team_id].number_color)
              const number = match_player[0].number

              return (
                <PlayerIcon
                  containerWidth={408}
                  containerHeight={276}
                  key={`playericon-${player_id}`}
                  // TODO: combine these?
                  shirtColor={shirtColor}
                  numberColor={numberColor}
                  number={number}
                  position={position}
                  hover={hoverPlayerId === player_id}
                  home={team_id === match.home_team_id}
                  onMouseEnter={() => setHoverPlayer(player_id)}
                  onMouseLeave={() => setHoverPlayer(null)}
                />
              )
            })}
          </svg>
        </Grid>
      </Grid>
    </Paper>
  )
}

//             <Grid item container xs={6} direction='row' justify='center' className={classes.pitch}

const PlayerIcon = props => {
  const {
    containerHeight,
    containerWidth,
    position,
    number,
    home,
    onMouseEnter,
    onMouseLeave
  } = props

  const [x, y] = calculateCoordinates({
    position,
    containerWidth,
    containerHeight,
    home
  })

  const classes = useStyles({ ...props, x, y })

  return (
    <g
      className={classes.playerIcon}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <circle className={classes.playerCircle} cx={1} cy={1} r="11" />
      <circle className={classes.playerCircleHighlight} cx={1} cy={1} r="11" />
      <text
        className={classes.playerNumber}
        x={1}
        y={5}
        textAnchor="middle"
        fontSize="11"
      >
        {number}
      </text>
    </g>
  )
}

const mapColor = memoize(color => color.replace('0x', '#'))

const calculateCoordinates = memoize(props => {
  const { containerWidth, containerHeight, position, home } = props

  if (position === 100) {
    return []
  }

  const xpct = ((position % 10) / 7) * 0.5
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
    width: '408px'
  },
  pitch: {
    margin: '0 auto',
    background: `url(${pitchImage}) center center no-repeat`,
    backgroundSize: '394px 254px',
    minWidth: '408px',
    minHeight: '276px',
    position: 'relative'
  },
  playerIcon: {
    position: 'absolute',
    transform: props => `translate(${props.x}px, ${props.y}px)`
  },
  playerCircle: {
    fill: props => props.shirtColor
  },
  playerCircleHighlight: {
    fillOpacity: 0.0,
    stroke: props => props.hover ? props.numberColor : props.shirtColor,
    strokeWidth: props => props.hover ? 2 : 0,
    // this is non-DRY, but hover is faster to update
    '&:hover': {
      stroke: props => props.numberColor,
      strokeWidth: 2
    }
  },
  playerNumber: {
    fill: props => props.numberColor,
    pointerEvents: 'none',
    fontFamily: ['Cabin', 'Roboto', 'sans-serif']
  }
})

const MATCH_TACTICS = gql`
  fragment MatchPlayerDetails on MatchPlayers {
    number
    player {
      id
      display_name
    }
  }

  fragment MatchTacticDetails on MatchTeamTactics {
    team_id
    match_id
    player_id
    position
    second
  }

  query findMatchTactics($id: Int!) {
    tactics: matchTeamTactics(match_id: $id) {
      ...MatchTacticDetails
      match_player {
        ...MatchPlayerDetails
      }
    }
  }
`

const MATCH_TEAMS = gql`
  fragment MatchTeamDetails on MatchTeams {
    match_id
    team_id
    score
    score_pen
    number_color
    shirt_color
    coach_name
    coach_surname
  }

  query findMatchTeams($id: Int!) {
    match(id: $id) {
      id
      home_team_id
      away_team_id
      home_team_info {
        ...MatchTeamDetails
      }
      away_team_info {
        ...MatchTeamDetails
      }
    }
  }
`
