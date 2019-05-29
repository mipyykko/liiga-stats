import { Model } from 'db'
import { getPath } from 'models/utils'

export class Season extends Model {
  static get tableName() {
    return 'seasons'
  }

  static get idColumn() {
    return ['id', 'tournament_id']
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        tournament_id: { type: 'integer' },
        name: { type: 'string' },
        start_year: { type: 'integer' },
        end_year: { type: ['integer', 'null'] },
        first_match_id: { type: 'integer' }
      }
    }
  }

  static get relationMappings() {
    return {
      tournament: {
        relation: Model.BelongsToOneRelation,
        modelClass: getPath('tournament'),
        join: {
          from: 'seasons.tournament_id',
          to: 'tournaments.id'
        }
      },
      // firstmatch...
    }
  }
}