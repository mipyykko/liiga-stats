import { Model } from 'db'
import path from 'path'

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
        id: { type: 'number' },
        tournament_id: { type: 'number' },
        name: { type: 'string' },
        start_year: { type: 'number' },
        end_year: { type: ['number', 'null'] },
        first_match_id: { type: 'number' }
      }
    }
  }

  static get relationMappings() {
    //const Tournament = require('./tournament')

    return {
      tournament: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'tournament'),
        join: {
          from: 'seasons.tournament_id',
          to: 'tournaments.id'
        }
      },
      // firstmatch...
    }
  }
}