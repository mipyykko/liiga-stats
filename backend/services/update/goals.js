const Goal = require('models/goal')
const _ = require('lodash')

const updateGoals = async (match) => {
  const { goals, match_id, first_team, second_team } = match

  let first_team_score = 0, second_team_score = 0

  return await Promise.all(
    _.orderBy(goals, ['second'], ['asc'])
      .map(async (goal) => {
        // does not handle penalty kick contests
        first_team_score = goal.side === 1 ? ++first_team_score : first_team_score
        second_team_score = goal.side !== 1 ? ++second_team_score : second_team_score

        // TODO: find and update
        const newGoal = await Goal.create({
          ..._.omit(goal, ['scorer', 'assistant']),
          team_id: goal.side === 1 ? first_team.team_id : second_team.team_id,
          scorer_id: goal.scorer.player_id,
          assistant_id: goal.assistant ? goal.assistant.player_id : null,
          match_id,
          first_team_score,
          second_team_score
        })

        return newGoal //.save() //{ ...newGoal._doc, scorer: goal.scorer }
      })
  )
}

module.exports = { updateGoals }