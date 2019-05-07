import { Model } from 'db'

export default class Goal extends Model {
  static get tableName() {
    return 'goals'
  }

  static get idColumn() {
    return ['match_id', 'home_team_score', 'away_team_score']
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        scorer_id: { type: 'integer' },
        assistant_id: { type: ['integer', 'null'] },
        match_id: { type: 'integer' },
        team_id: { type: 'integer' },
        half: { type: 'integer' },
        second: { type: 'integer' },
        standard: { type: 'integer' },
        type: { type: 'integer' },
        side: { type: 'integer' },
        home_team_score: { type: 'integer' },
        away_team_score: { type: 'integer' }
      }
    }
  }
}