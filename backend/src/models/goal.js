import { BaseModel } from 'models/base'

export class Goal extends BaseModel {
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
        assistant_id: { type: ['integer', 'null'] },
        match_id: { type: 'integer' },
        team_id: { type: 'integer' },
        opposing_team_id: { type: 'integer' },
        opposing_goalkeeper_id: { type: 'integer' },
        half: { type: 'integer' },
        second: { type: 'integer' },
        standard: { type: 'integer' },
        type: { type: 'integer' },
        side: { type: 'integer' },
        home_team_score: { type: 'integer' },
        away_team_score: { type: 'integer' },
        home_team_prev_score: { type: 'integer' },
        away_team_prev_score: { type: 'integer' },
        winning: { type: 'boolean' },
        equalizing: { type: 'boolean' },
        first: { type: 'boolean' }
      }
    }
  }

  static get relationMappings() {
    return {
      scorer: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'player',
        join: {
          from: 'goals.scorer_id',
          to: 'players.id'
        }
      },
      assistant: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'player',
        join: {
          from: 'goals.assistant_id',
          to: 'players.id'
        }
      },
      opposing_goalkeeper: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'player',
        join: {
          from: 'goals.opposing_goalkeeper_id',
          to: 'players.id'
        }
      }
    }
  }
}
