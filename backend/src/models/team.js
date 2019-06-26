import { BaseModel } from 'models/base'

export class Team extends BaseModel {
  static get tableName() {
    return 'teams'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        display_name: { type: 'string' },
        country: { type: 'string' },
        logo: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    return {
      matches: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'match',
        join: {
          from: 'teams.id',
          through: {
            from: 'match_players.team_id',
            to: 'match_players.match_id'
          },
          to: 'matches.id'
        }
      },
      players: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'player',
        join: {
          from: 'teams.id',
          through: {
            from: 'match_players.team_id',
            to: 'match_players.player_id'
          },
          to: 'players.id'
        }
      }
    }
  }
}
