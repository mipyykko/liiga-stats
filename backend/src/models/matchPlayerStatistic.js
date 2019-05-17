import { Model } from 'db'
import path from 'path'

export class MatchPlayerStatistic extends Model {
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
        player_id: { type: 'number' },
        match_id: { type: 'number' },
        team_id: { type: 'number' },
        number: { type: ['number', 'null'] },
        position_id: { type: ['number', 'null'] },
        starting: { type: 'boolean' },
        replaced_player_id: { type: ['number', 'null'] },
        replacement_player_id: { type: ['number', 'null'] },
        isi: { type: ['number', 'null'] },
        cw: { type: ['number', 'null'] },
        t: { type: ['number', 'null'] },
        fop: { type: ['number', 'null'] },
        pap:{ type: ['number', 'null'] },
        g: { type: ['number', 'null'] },
        a: { type: ['number', 'null'] },
        spdm: { type: ['number', 'null'] },
        mof: { type: ['number', 'null'] },
        s: { type: ['number', 'null'] },
        c: { type: ['number', 'null'] },
        spda:{ type: ['number', 'null'] },
        offs: { type: ['number', 'null'] },
        d: { type: ['number', 'null'] },
        f: { type: ['number', 'null'] },
        lb: { type: ['number', 'null'] },
        st: { type: ['number', 'null'] },
        cwp: { type: ['number', 'null'] },
        pa: { type: ['number', 'null'] }
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