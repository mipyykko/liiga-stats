import { Model } from 'db'

export default class MatchTeamStatistic extends Model {
  static get tableName() {
    return 'match_team_statistics'
  }

  static get jsonSchema() {
    return {
      type: 'object',
    
      properties: {
        team_id: { type: 'integer' },
        match_id: { type: 'integer' },
        status: { type: 'integer' },
        s: { type: 'integer' },
        st: { type: 'integer' },
        f: { type: 'integer' },
        pa: { type: 'integer' },
        pap: { type: 'float' },
        bpm: { type: 'float' },
        bpp: { type: 'float' },
        ck: { type: 'integer' },
        cw: { type: 'integer' },
        cwp: { type: 'integer' },
        offs: { type: 'integer' },
        yc: { type: 'integer' },
        rc: { type: 'integer' }
      }
    }
  }
}