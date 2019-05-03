import { Model } from 'db'

export default class MatchPlayerStatistic extends Model {
  static get tableName() {
    return 'match_player_statistics'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        player_id: { type: 'integer' },
        match_id: { type: 'integer' },
        team_id: { type: 'integer' },
        number: { type: 'integer' },
        position_id: { type: 'integer' },
        starting: { type: 'boolean' },
        replaced_player_id: { type: 'integer' },
        replacement_player_id: { type: 'integer' },
        s: { type: 'integer' },
        st: { type: 'integer' },
        f: { type: 'integer' },
        pa: { type: 'integer' },
        pap: { type: 'float' },
        bpm: { type: 'float' },
        bpp: { type: 'float' },
        ck: { type: 'integer' },
        cw: { type: 'integer' },
        cwp: { type: 'integer' },
        offs: { type: 'integer' },
        yc: { type: 'integer' },
        rc: { type: 'integer' }
      }
    }
  }

  static get relationMappings() {
    const Match = require('./match')
    const Player = require('./player')
    const Team = require('./team')

    return {
      match: {
        relation: Model.HasOneRelation,
        modelClass: Match,
        join: {
          from: 'match_player_statistics.match_id',
          to: 'matches.id'
        }
      },
      player: {
        relation: Model.HasOneRelation,
        modelClass: Player,
        join: {
          from: 'match_player_statistics.player_id',
          to: 'players.id'
        }
      },
      team: {
        relation: Model.HasOneRelation,
        modelClass: Team,
        join: { 
          from: 'match_player_statistics.team_id',
          to: 'teams.id'
        }
      }
    }
  }
}