const Team = require('models/team')
const TeamStatistics = require('models/team-statistics')

const updateTeams = async (teams, options = { force: false }) => {
  return await Promise.all(teams.map(async (team) => {
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

const updateTeamStatistics = async (team, match) => {
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

module.exports = { updateTeams, updateTeamStatistics }
