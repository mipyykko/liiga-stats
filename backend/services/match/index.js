const Match = require('models/match')
const Player = require('models/player')

class MatchService {
  static async findMatch(match_id) {
    return this.populateQuery({ 
      goals: true,
      scorers: true,
      assistants: true,
      players: true,
      player_statistics: true,
      teams: true,
      team_statistics: true
    })(Match.findOne({ _id: match_id }))
  }

  static async findMatches(tournament_id, season_id, options) {
    const query = {}
    
    if (tournament_id) { query.tournament_id = tournament_id }
    if (season_id) { query.season_id = season_id }

    return this.populateQuery(options)(Match.find(query))
  }

  static populateQuery(options) {
    return (query) => {
      const { goals, scorers, assistants, players, player_statistics, teams, team_statistics } = options

      if (goals) {
        let goalQuery = { path: 'goals' }
        if (scorers) {
          goalQuery.populate = [{ path: 'scorer' }]
        }
        if (assistants) {
          goalQuery.populate.push({ path: 'assistant '})
        }

        query = query.populate(goalQuery)
      }
      if (players) {
        query = query.populate('players.player')
        if (player_statistics) {
          query = query.populate('players.statistics')
        }
      }
      if (teams) {
        query = query.populate('first_team.team').populate('second_team.team')
        if (team_statistics) {
          query = query.populate('first_team.statistics').populate('second_team.statistics')
        }
      }

      return query
    }
  }
}

module.exports = MatchService