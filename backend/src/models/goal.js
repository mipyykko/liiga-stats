import { Model } from 'db'

export class Goal extends Model {
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
        scorer_id: { type: 'number' },
        assistant_id: { type: ['number', 'null'] },
        match_id: { type: 'number' },
        team_id: { type: 'number' },
        opposing_team_id: { type: 'number' }, 
        opposing_goalkeeper_id: { type: 'number' },
        half: { type: 'number' },
        second: { type: 'number' },
        standard: { type: 'number' },
        type: { type: 'number' },
        side: { type: 'number' },
        home_team_score: { type: 'number' },
        away_team_score: { type: 'number' },
        home_team_prev_score: { type: 'number' },
        away_team_prev_score: { type: 'number' }
      }
    }
  }
}