import { BaseModel } from '.'

export class TeamStatisticModel extends BaseModel {
  static get jsonSchema() {
    return {
      type: 'object',

      /*
        bpm: "Ball possession",
        bpp: "Ball possession, %",
        ck: "Corners",
        cw: "Won challenges",
        cwp: "% of won challenges",
        empty_data: "No data",
        f: "Fouls",
        header: "Team statistics",
        offs: "Offsides",
        pa: "Accurate passes",
        pap: "% of accurate passes",
        rc: "Red cards",
        s: "Shots",
        st: "Shots on target",
        yc: "Yellow cards"
      */

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
        pena: { type: ['integer', 'null'] }, // penalties against,
        pengf: { type: ['integer', 'null'] }, // penalty goals for,
        penga: { type: ['integer', 'null'] }, // penalty goals against
        bpt: { type: ['number', 'null'] }, // ball possession total (both teams),
        min: { type: ['number', 'null'] } // total playing time
      }
    }
  }
}