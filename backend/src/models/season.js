import { BaseModel } from 'models/base'

export class Season extends BaseModel {
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
        id: { type: 'integer' },
        tournament_id: { type: 'integer' },
        name: { type: 'string' },
        start_year: { type: 'integer' },
        end_year: { type: ['integer', 'null'] },
        first_match_id: { type: 'integer' }
      }
    }
  }

  static get relationMappings() {
    return {
      tournament: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'tournament',
        join: {
          from: 'seasons.tournament_id',
          to: 'tournaments.id'
        }
      }
      // firstmatch...
    }
  }
}
