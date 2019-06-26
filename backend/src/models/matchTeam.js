import { BaseModel } from 'models/base'

export class MatchTeam extends BaseModel {
  static get tableName() {
    return 'match_teams'
  }

  static get idColumn() {
    return ['match_id', 'team_id']
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        match_id: { type: 'integer' },
        team_id: { type: 'integer' },
        score: { type: 'integer' },
        score_pen: { type: 'integer' },
        number_color: { type: ['string', 'null'] },
        shirt_color: { type: ['string', 'null'] },
        coach_name: { type: 'string' },
        coach_surname: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    return {
      match: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'match',
        join: {
          from: 'match_teams.match_id',
          to: 'matches.id'
        }
      },
      team: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'team',
        join: {
          from: 'match_teams.team_id',
          to: 'teams.id'
        }
      },
      goals: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'goal',
        join: {
          from: ['match_teams.match_id', 'match_teams.team_id'],
          to: ['goals.match_id', 'goals.team_id']
        }
      },
      statistics: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'matchTeamStatistic',
        join: {
          from: ['match_teams.team_id', 'match_teams.match_id'],
          to: [
            'match_team_statistics.team_id',
            'match_team_statistics.match_id'
          ]
        }
      },
      tactics: {
        relation: BaseModel.HasManyRelation,
        modelClass: 'matchTeamTactic',
        join: {
          from: ['match_teams.team_id', 'match_teams.match_id'],
          to: ['match_team_tactics.team_id', 'match_team_tactics.match_id']
        }
      }
    }
  }
}
