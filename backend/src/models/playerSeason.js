import { BaseModel } from 'models/base'

export class PlayerSeason extends BaseModel {
  static get tableName() {
    return 'player_seasons'
  }

  static get idColumn() {
    return ['player_id', 'team_id', 'tournament_id', 'season_id']
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        player_id: { type: 'integer' },
        team_id: { type: 'integer' },
        tournament_id: { type: 'integer' },
        season_id: { type: 'integer' }
      }
    }
  }

  static get relationMappings() {
    return {
      team: {
        relation: BaseModel.HasOneRelation,
        modelClass: 'team',
        join: {
          from: 'player_seasons.team_id',
          to: 'teams.id'
        }
      },
      player: {
        relation: BaseModel.HasOneRelation,
        modelClass: 'player',
        join: {
          from: 'player_seasons.player_id',
          to: 'players.id'
        }
      },
      season: {
        relation: BaseModel.HasOneRelation,
        modelClass: 'season',
        join: {
          from: ['player_seasons.tournament_id', 'player_seasons.season_id'],
          to: ['seasons.tournament_id', 'seasons.id']
        }
      },
      tournament: {
        relation: BaseModel.HasOneRelation,
        modelClass: 'tournament',
        join: {
          from: 'player_seasons.tournament_id',
          to: 'tournaments.id'
        }
      }
    } // TODO: matches needs subquery
  }
}
