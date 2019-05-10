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
        team_id: { type: 'integer' },
        match_id: { type: 'integer' },
        status: { type: 'integer' },
        s: { type: ['integer', 'null'] },
        st: { type: ['integer', 'null'] },
        f: { type: ['integer', 'null'] },
        pa: { type: ['integer', 'null'] },
        pap: { type: ['number', 'null'] },
        bpm: { type: ['number', 'null'] },
        bpp: { type: ['number', 'null'] },
        ck: { type: ['integer', 'null'] },
        cw: { type: ['integer', 'null'] },
        cwp: { type: ['integer', 'null'] },
        offs: { type: ['integer', 'null'] },
        yc: { type: ['integer', 'null'] },
        rc: { type: ['integer', 'null'] }
      }
    }
  }
}