import Team from 'knex-models/team'
import MatchTeamStatistic from 'knex-models/matchTeamStatistic'

import _ from 'lodash'

export const updateTeams = async (teams, options = { force: false }) => {
  return await Promise.all(_.uniqBy(teams, 'team_id').map(async (team) => {
    const { team_id, name, logo } = team

    const foundTeam = await Team.query().findById(team_id)
    
    if (!options.force && foundTeam) {
      return foundTeam
    }

    return await Team
      .query()
      .insert({
        id: team_id,
        name,
        display_name: name,
        logo
      })
  }))
}

export const updateTeamStatistics = async (team, match) => {
  return await MatchTeamStatistic
    .query()
    .insert({
      team_id: team.team_id,
      match_id: match.match_id,
      ...team.statistics
    })
}

export const getUniqueTeams = (matches) => _.uniqBy(
  _.flatten(matches.map(match => [match.first_team, match.second_team])), 
  'team_id'
)