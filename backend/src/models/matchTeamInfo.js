import { Model } from 'db'
import { getPath } from 'models/utils'

export class MatchTeamInfo extends Model {
  static get tableName() {
    return 'match_team_infos'
  }

  static get idColumn() {
    return ['match_id', 'team_id']
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        match_id: { type: 'number' },
        team_id: { type: 'number' },
        score: { type: 'number' },
        score_pen: { type: 'number' },
        number_color: { type: ['string', 'null'] },
        shirt_color: { type: ['string', 'null'] },
        coach_name: { type: 'string' },
        coach_surname: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    return {
      match: {
        relation: Model.BelongsToOneRelation,
        modelClass: getPath('match'),
        join: {
          from: 'match_team_infos.match_id',
          to: 'matches.id'
        }
      },
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: getPath('team'),
        join: {
          from: 'match_team_infos.team_id',
          to: 'teams.id'
        }
      }
    }
  }
}
