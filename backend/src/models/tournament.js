import { BaseModel } from 'models/base'

export class Tournament extends BaseModel {
  static get tableName() {
    return 'tournaments'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        country: { type: 'string' },
        type: { type: 'number' }
      }
    }
  }

  static get relationMappings() {
    return {
      seasons: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'season',
        join: {
          from: 'tournaments.id',
          to: 'seasons.tournament_id'
        }
      }
    }
  }
}
