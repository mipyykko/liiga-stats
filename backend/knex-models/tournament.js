import { Model } from 'db'
import path from 'path'

export default class Tournament extends Model {
  static get tableName() {
    return 'tournaments'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer '},
        name: { type: 'string' },
        country: { type: 'string' },
        type: { type: 'integer' }
      }
    }
  }

  static get relationMappings() {
    // const Season = require('./season')

    return {
      seasons: {
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'season'),
        join: {
          from: 'tournaments.id',
          to: 'seasons.tournament_id'
        }
      }
    }
  }
}
