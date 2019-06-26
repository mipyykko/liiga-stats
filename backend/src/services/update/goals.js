import _ from 'lodash'
import { convertTimeToSec } from 'utils'

export const getMatchGoals = match => {
  const { goals, match_id, score_first_team, score_second_team } = match

  const first_team_id = _.get(match, 'first_team.team_id')
  const second_team_id = _.get(match, 'second_team.team_id')

  if (!goals || goals.length === 0) {
    return null
  }

  let home_team_score = 0,
    away_team_score = 0
  let home_team_prev_score, away_team_prev_score

  const goalEventMap = mapGoalsToEvents(match)

  return _.orderBy(goals, ['half', 'second']).map((goal, idx) => {
    const { side, scorer, assistant } = goal

    home_team_prev_score = home_team_score
    away_team_prev_score = away_team_score
    home_team_score = side === 1 ? ++home_team_score : home_team_score
    away_team_score = side !== 1 ? ++away_team_score : away_team_score

    return {
      ..._.omit(goal, ['scorer', 'assistant', 'minute']),
      match_id,
      team_id: side === 1 ? first_team_id : second_team_id,
      opposing_team_id: side === 1 ? second_team_id : first_team_id,
      home_team_score,
      away_team_score,
      home_team_prev_score,
      away_team_prev_score,
      scorer_id: scorer.player_id,
      assistant_id: assistant ? assistant.player_id : null,
      opposing_goalkeeper_id: _.get(
        goalEventMap,
        `[${goal.second}].opponent_player_id`
      ),
      first: idx === 0 ? true : false,
      winning: isWinningGoal({
        score_first_team,
        score_second_team,
        home_team_score,
        away_team_score,
        side
      }),
      equalizing:
        score_first_team === score_second_team && idx === goals.length - 1
    }
  })
}

export const isWinningGoal = ({
  score_first_team,
  score_second_team,
  home_team_score,
  away_team_score,
  side
}) => {
  if (score_first_team === score_second_team) {
    return false
  }

  const winningTeam = score_first_team > score_second_team ? 1 : 2
  const isWinner = side === winningTeam

  if (!isWinner) {
    return false
  }

  return side === 1
    ? home_team_score === score_second_team + 1
    : away_team_score === score_first_team + 1
}

const mapGoalsToEvents = match => {
  const goalEvents = _.uniqBy(
    (match.events || []).filter(e => Math.floor(e.action_code / 1000) === 8),
    e => `${e.minute}:${e.second}`
  )

  const goals = _.uniqBy(match.goals, 'second')

  return goals.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.second]: goalEvents.find(
        e => curr.second === convertTimeToSec(e.minute - 1, e.second)
      )
    }
  }, {})
}
