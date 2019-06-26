import { BaseModel } from 'models/base'

export class Player extends BaseModel {
  static get tableName() {
    return 'players'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        surname: { type: 'string' },
        display_name: { type: 'string' },
        photo: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    return {
      matches: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'match',
        join: {
          from: 'players.id',
          through: {
            from: 'match_players.player_id',
            to: 'match_players.match_id'
          },
          to: 'matches.id'
        }
      },
      match_infos: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'matchPlayer',
        join: {
          from: 'players.id',
          to: 'match_players.player_id'
        }
      }
    }
  }
}
