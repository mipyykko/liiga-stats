import { BaseModel } from '.'

export class PlayerStatisticModel extends BaseModel {
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        isi: { type: ['integer', 'null'] },
        mof: { type: ['integer', 'null'] },
        g: { type: ['integer', 'null'] },
        a: { type: ['integer', 'null'] },
        gf: { type: ['integer', 'null'] }, // first goal
        gw: { type: ['integer', 'null'] }, // winning goal
        geq: { type: ['integer', 'null'] }, // equalizing goal
        ga: { type: ['integer', 'null'] }, // goals against (gk)
        pen: { type: ['integer', 'null'] }, // penalty shots
        peng: { type: ['integer', 'null'] }, // penalty goals,
        pena: { type: ['integer', 'null'] }, // penalty shots against (gk)
        penga: { type: ['integer', 'null'] }, // penalty goals against (gk)
        s: { type: ['integer', 'null'] },
        st: { type: ['integer', 'null'] },
        f: { type: ['integer', 'null'] },
        fop: { type: ['integer', 'null'] },
        t: { type: ['integer', 'null'] },
        lb: { type: ['integer', 'null'] },
        p: { type: ['integer', 'null'] },
        pa: { type: ['integer', 'null'] },
        pap: { type: ['number', 'null'] },
        offs: { type: ['integer', 'null'] },
        c: { type: ['integer', 'null'] },
        cw: { type: ['integer', 'null'] },
        cwp: { type: ['number', 'null'] },
        d: { type: ['integer', 'null'] },
        spda: { type: ['number', 'null'] },
        spdm: { type: ['number', 'null'] }
      }
    }
  }
}
