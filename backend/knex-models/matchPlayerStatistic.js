import { Model } from 'db'
import path from 'path'
export default class MatchPlayerStatistic extends Model {
  static get tableName() {
    return 'match_player_statistics'
  }

  static get idColumn() {
    return ['player_id', 'match_id'] // 'team_id'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        player_id: { type: 'integer' },
        match_id: { type: 'integer' },
        team_id: { type: 'integer' },
        number: { type: 'integer' },
        position_id: { type: ['integer', 'null'] },
        starting: { type: 'boolean' },
        replaced_player_id: { type: ['integer', 'null'] },
        replacement_player_id: { type: ['integer', 'null'] },
        s: { type: ['integer', 'null'] },
        st: { type: ['integer', 'null'] },
        f: { type: ['integer', 'null'] },
        pa: { type: ['integer', 'null'] },
        pap: { type: ['number', 'null'] },
        bpm: { type: ['number', 'null'] },
        bpp: { type: ['number', 'null'] },
        ck: { type: ['integer', 'null'] },
        cw: { type: ['integer', 'null'] },
        cwp: { type: ['integer', 'null'] },
        offs: { type: ['integer', 'null'] },
        yc: { type: ['integer', 'null'] },
        rc: { type: ['integer', 'null'] }
      }
    }
  }

  static get relationMappings() {
/*     const Match = require('./match')
    const Player = require('./player')
    const Team = require('./team')

 */    
    return {
      match: {
        relation: Model.HasOneRelation,
        modelClass: path.join(__dirname, 'match'),
        join: {
          from: 'match_player_statistics.match_id',
          to: 'matches.id'
        }
      },
      player: {
        relation: Model.HasOneRelation,
        modelClass: path.join(__dirname, 'player'),
        join: {
          from: 'match_player_statistics.player_id',
          to: 'players.id'
        }
      },
      team: {
        relation: Model.HasOneRelation,
        modelClass: path.join(__dirname, 'team'),
        join: { 
          from: 'match_player_statistics.team_id',
          to: 'teams.id'
        }
      }
    }
  }
}