import { Model } from 'db'
import path from 'path'

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
        team_id: { type: 'integer' },
        match_id: { type: 'integer' },
        player_id: { type: 'integer' },
        position: { type: ['integer', 'null'] },
        second: { type: 'integer' }
      }
    }
  }
  
  static get relationMappings() {
    return {
      player: { 
        relation: Model.HasManyRelation,
        modelClass: path.join(__dirname, 'player'), 
        join: { 
          from: 'match_team_tactics.player_id',
          to: 'players.id'
        }
      }
    }
  }
}