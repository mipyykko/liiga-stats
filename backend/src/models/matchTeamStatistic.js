import { Model } from 'db'

export class MatchTeamStatistic extends Model {
  static get tableName() {
    return 'match_team_statistics'
  }

  static get idColumn() {
    return ['team_id', 'match_id']
  }
  
  static get jsonSchema() {
    return {
      type: 'object',
    
      properties: {
        team_id: { type: 'number' },
        match_id: { type: 'number' },
        status: { type: 'number' },
        s: { type: ['number', 'null'] },
        st: { type: ['number', 'null'] },
        f: { type: ['number', 'null'] },
        pa: { type: ['number', 'null'] },
        pap: { type: ['number', 'null'] },
        bpm: { type: ['number', 'null'] },
        bpp: { type: ['number', 'null'] },
        ck: { type: ['number', 'null'] },
        cw: { type: ['number', 'null'] },
        cwp: { type: ['number', 'null'] },
        offs: { type: ['number', 'null'] },
        yc: { type: ['number', 'null'] },
        rc: { type: ['number', 'null'] }
      }
    }
  }
}