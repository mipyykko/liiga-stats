import { Model } from 'db'
import { getPath } from 'models/utils'

export class MatchTeamTactic extends Model {
  static get tableName() {
    return 'match_team_tactics'
  }

  static get idColumn() {
    return ['team_id', 'match_id', 'player_id', 'second']
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: { 
        team_id: { type: 'number' },
        match_id: { type: 'number' },
        player_id: { type: 'number' },
        position: { type: ['number', 'null'] },
        second: { type: 'number' }
      }
    }
  }

  static get relationMappings() {
    return {
      player: { 
        relation: Model.HasManyRelation,
        modelClass: getPath('player'), 
        join: { 
          from: 'match_team_tactics.player_id',
          to: 'players.id'
        }
      }
    }
  }
}