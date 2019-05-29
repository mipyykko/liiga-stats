import { Model } from 'db'
import { getPath } from './utils'

export class Team extends Model {
  static get tableName() {
    return 'teams'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        display_name: { type: 'string' },
        country: { type: 'string' },
        logo: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    return {
      matches: {
        relation: Model.ManyToManyRelation,
        modelClass: getPath('match'),
        join: {
          from: 'teams.id',
          through: {
            from: 'match_players.team_id',
            to: 'match_players.match_id'
          },
          to: 'matches.id',
        }
      },
      players: {
        relation: Model.ManyToManyRelation,
        modelClass: getPath('player'),
        join: {
          from: 'teams.id',
          through: {
            from: 'match_players.team_id',
            to: 'match_players.player_id',
          },
          to: 'players.id'
        }
      }
    }
  }
}
