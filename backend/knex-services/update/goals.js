import _ from 'lodash'

export const getMatchGoals = (match) => {
  const { 
    goals, 
    match_id, 
    first_team: { team_id: first_team_id }, 
    second_team: { team_id: second_team_id} 
  } = match

  if (!goals || goals.length === 0) {
    return null
  }

  let home_team_score = 0, away_team_score = 0

  return _.orderBy(goals, ['half', 'second']).map(goal => {
    const { side, scorer, assistant } = goal

    home_team_score = side === 1 ? ++home_team_score : home_team_score
    away_team_score = side !== 1 ? ++away_team_score : away_team_score

    return {
      ..._.omit(goal, ['scorer', 'assistant', 'minute']),
      match_id,
      team_id: side === 1 ? first_team_id : second_team_id,
      home_team_score,
      away_team_score,
      scorer_id: scorer.player_id,
      assistant_id: assistant ? assistant.player_id : null,
    }
  }) 
}