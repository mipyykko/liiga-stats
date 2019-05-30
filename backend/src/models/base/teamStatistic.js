import { BaseModel } from '.'

export class TeamStatisticModel extends BaseModel {
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        status: { type: 'integer' }, // what the hell is this?
        s: { type: ['integer', 'null'] },
        st: { type: ['integer', 'null'] },
        f: { type: ['integer', 'null'] },
        p: { type: ['integer', 'null'] },
        pa: { type: ['integer', 'null'] },
        pap: { type: ['number', 'null'] },
        bpm: { type: ['number', 'null'] },
        bpp: { type: ['number', 'null'] },
        ck: { type: ['integer', 'null'] },
        c: { type: ['integer', 'null']},
        cw: { type: ['integer', 'null'] },
        cwp: { type: ['number', 'null'] },
        offs: { type: ['integer', 'null'] },
        yc: { type: ['integer', 'null'] },
        rc: { type: ['integer', 'null'] },
        penf: { type: ['integer', 'null'] }, // penalties for
        pena: { type: ['integer', 'null'] } // penalties against
      }
    }
  }
}