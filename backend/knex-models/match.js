import { Model } from 'db'
import path from 'path'

export default class Match extends Model {
  static get tableName() {
    return 'matches'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: { 
        id: { type: 'integer' },
        tournament_id: { type: 'integer' },
        season_id: { type: 'integer' },
        round: { type: 'integer' },
        date: { type: 'date-time' },
        time: { type: 'time' },
        status: { type: 'integer' },
        min: { type: 'integer' },
        width: { type: 'integer' },
        height: { type: 'integer' },
        home_team_id: { type: 'integer' },
        away_team_id: { type: 'integer' },
        home_score: { type: 'integer' },
        away_score: { type: 'integer' } 
      }
    }
  }

  static get relationMappings() {
/*     const Tournament = require('./tournament')
    const Season = require('./season')
    const Team = require('./team')
    const MatchPlayerStatistic = require('./matchPlayerStatistic')
    const MatchTeamStatistic = require('./matchTeamStatistic')
    const MatchTeamInfo = require('./matchTeamInfo')
 */    
    return {
      tournament: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'tournament'),
        join: {
          from: 'matches.tournament_id',
          to: 'tournaments.id'
        }
      },
      season: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'season'),
        join: {
          from: [
            'matches.tournament_id',
            'matches.season_id'
          ],
          to: [
            'seasons.tournament_id',
            'seasons.id'
          ]
        }
      },
      home_team: {
        relation: Model.HasOneRelation,
        modelClass: path.join(__dirname, 'team'),
        join: {
          from: 'matches.home_team_id',
          to: 'teams.id'
        },
      },
      away_team: {
        relation: Model.HasOneRelation,
        modelClass: path.join(__dirname, 'team'),
        join: {
          from: 'matches.away_team_id',
          to: 'teams.id'
        }
      },
      home_players: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'matchPlayerStatistic'),
        join: {
          from: [
            'matches.home_team_id',
            'matches.id'
          ],
          to: [
            'match_player_statistics.team_id',
            'match_player_statistics.match_id'
          ]
        },
      },
      away_players: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'matchPlayerStatistic'),
        join: {
          from: [
            'matches.away_team_id',
            'matches.id'
          ],
          to: [
            'match_player_statistics.team_id',
            'match_player_statistics.match_id'
          ]
        },
      },
      home_statistics: {
        relation: Model.HasOneRelation,
        modelClass: path.join(__dirname, 'matchTeamStatistic'),
        join: {
          from: [
            'matches.home_team_id',
            'matches.id'
          ],
          to: [
            'match_team_statistics.team_id',
            'match_team_statistics.match_id'
          ]
        }
      },
      away_statistics: {
        relation: Model.HasOneRelation,
        modelClass: path.join(__dirname, 'matchTeamStatistic'),
        join: {
          from: [
            'matches.away_team_id',
            'matches.id'
          ],
          to: [
            'match_team_statistics.team_id',
            'match_team_statistics.match_id'
          ]
        }
      },
      home_team_info: {
        relation: Model.HasOneRelation,
        modelClass: path.join(__dirname, 'matchTeamInfo'),
        join: {
          from: [
            'matches.home_team_id',
            'matches.id'
          ],
          to: [
            'match_team_infos.team_id',
            'match_team_infos.match_id'
          ]
        }
      },
      away_team_info: {
        relation: Model.HasOneRelation,
        modelClass: path.join(__dirname, 'matchTeamInfo'),
        join: {
          from: [
            'matches.away_team_id',
            'matches.id'
          ],
          to: [
            'match_team_infos.team_id',
            'match_team_infos.match_id'
          ]
        }
      }
    }
  }
}