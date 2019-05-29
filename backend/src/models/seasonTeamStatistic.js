import { Model } from 'db'

export class SeasonTeamStatistic extends Model {
  static get tableName() {
    return 'season_team_statistics'
  }

  static get idColumn() {
    return ['team_id', 'season_id', 'tournament_id']
  }
  
  static get jsonSchema() {
    return {
      type: 'object',
    
      /*
          bpm: "Ball possession",
          bpp: "Ball possession, %",
          ck: "Corners",
          c: 'Challenges",
          cw: "Won challenges",
          cwp: "% of won challenges",
          empty_data: "No data",
          f: "Fouls",
          header: "Team statistics",
          offs: "Offsides",
          p: "Passes",
          pa: "Accurate passes",
          pap: "% of accurate passes",
          rc: "Red cards",
          s: "Shots",
          st: "Shots on target",
          yc: "Yellow cards"      
      */
      
      properties: {
        team_id: { type: 'integer' },
        season_id: { type: 'integer' },
        tournament_id: { type: 'integer' },
        status: { type: 'integer' }, // what the hell is this?
        w: { type: ['integer', 'null'] }, // won
        d: { type: ['integer', 'null'] }, // drew
        l: { type: ['integer', 'null'] }, // lost,
        gf: { type: ['integer', 'null'] }, // goals for
        ga: { type: ['integer', 'null'] }, // goals against
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