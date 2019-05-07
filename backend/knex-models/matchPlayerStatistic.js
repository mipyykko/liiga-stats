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
        number: { type: ['integer', 'null'] },
        position_id: { type: ['integer', 'null'] },
        starting: { type: 'boolean' },
        replaced_player_id: { type: ['integer', 'null'] },
        replacement_player_id: { type: ['integer', 'null'] },
        isi: { type: ['integer', 'null'] },
        cw: { type: ['integer', 'null'] },
        t: { type: ['integer', 'null'] },
        fop: { type: ['integer', 'null'] },
        pap:{ type: ['number', 'null'] },
        g: { type: ['integer', 'null'] },
        a: { type: ['integer', 'null'] },
        spdm: { type: ['number', 'null'] },
        mof: { type: ['integer', 'null'] },
        s: { type: ['integer', 'null'] },
        c: { type: ['integer', 'null'] },
        spda:{ type: ['number', 'null'] },
        offs: { type: ['integer', 'null'] },
        d: { type: ['integer', 'null'] },
        f: { type: ['integer', 'null'] },
        lb: { type: ['integer', 'null'] },
        st: { type: ['integer', 'null'] },
        cwp: { type: ['number', 'null'] },
        pa: { type: ['integer', 'null'] }
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