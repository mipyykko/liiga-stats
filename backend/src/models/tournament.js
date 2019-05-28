import { Model } from 'db'
import { getPath } from 'models/utils'

export class Tournament extends Model {
  static get tableName() {
    return 'tournaments'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        country: { type: 'string' },
        type: { type: 'number' }
      }
    }
  }

  static get relationMappings() {
    return {
      seasons: {
        relation: Model.HasManyRelation,
        modelClass: getPath('season'),
        join: {
          from: 'tournaments.id',
          to: 'seasons.tournament_id'
        }
      }
    }
  }
}
