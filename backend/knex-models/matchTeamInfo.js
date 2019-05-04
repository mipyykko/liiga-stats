import { Model } from 'db'
import path from 'path'
export default class MatchTeamInfo extends Model {
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
        match_id: { type: 'integer' },
        team_id: { type: 'integer' },
        score: { type: 'integer' },
        score_pen: { type: 'integer' },
        number_color: { type: 'string' },
        shirt_color: { type: 'string' },
        coach_name: { type: 'string' },
        coach_surname: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
/*     const Match = require('./match')
    const Team = require('./team')
 */
    return {
      match: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'match'),
        join: {
          from: 'match_team_infos.match_id',
          to: 'matches.id'
        }
      },
      team: {
        relation: Model.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'team'),
        join: {
          from: 'match_team_infos.team_id',
          to: 'teams.id'
        }
      }
    }
  }
}
