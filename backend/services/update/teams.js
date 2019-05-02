import Team from 'models/team'
import TeamStatistics from 'models/team-statistics'

import _ from 'lodash'

export const updateTeams = async (teams, options = { force: false }) => {
  return await Promise.all(_.uniqBy(teams, 'team_id').map(async (team) => {
    const { team_id } = team

    const foundTeam = await Team.findOne({ _id: team_id })
    
    if (!options.force && foundTeam) {
      return foundTeam
    }

    return await Team.findOneAndUpdate({
      _id: team.team_id
    }, {
      $set: {
        team_id: team.team_id,
        name: team.name,
        logo: team.logo,
      }
    }, {
      new: true, upsert: true
    }).exec()      
  }))
}

export const updateTeamStatistics = async (team, match) => {
  return await TeamStatistics.findOneAndUpdate({
    team_id: team.team_id,
    match_id: match.match_id
  }, { 
    $set: {
      ...team.statistics
    }
  }, { 
    new: true, upsert: true
  }).exec()
}

export const getUniqueTeams = (matches) => _.uniqBy(
  _.flatten(matches.map(match => [match.first_team, match.second_team])), 
  'team_id'
)