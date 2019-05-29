import { Model } from 'db'
import { getPath } from 'models/utils'

export class SeasonPlayerStatistic extends Model {
  static get tableName() {
    return 'season_player_statistics'
  }

  static get idColumn() {
    return ['player_id', 'tournament_id', 'season_id', 'team_id']
  }

  /*
    a: "Assists",
    c. "challenges",
    cw: "Won challenges",
    cwp: "% of challenges won",
    d: "Total distance, m",
    empty_data: "No data",
    f: "Fouls",
    fop: "Fouls suffered",
    g: "Goals",
    header: "Players tables",
    isi: "InStat Index",
    lb: "Lost balls",
    mof: "Minutes played",
    offs: "Offsides",
    p: "Passes",
    pa: "Accurate passes",
    pap: "% of accurate passes",
    s: "Shots",
    spda: "Average speed, km/h",
    spdm: "Maximal speed, km/h",
    st: "Shots on target",
    t: "Recovered balls"
  */
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        player_id: { type: 'integer' },
        tournament_id: { type: 'integer' },
        season_id: { type: 'integer' },
        team_id: { type: 'integer' },
        gt: { type: ['integer', 'null'] }, // games total,
        gst: { type: ['integer', 'null'] }, // games started,
        gin: { type: ['integer', 'null'] }, // games subbed in,
        gout: { type: ['integer', 'null'] }, // games subbed out
        isi: { type: ['integer', 'null'] },
        mof: { type: ['integer', 'null'] },
        g: { type: ['integer', 'null'] },
        a: { type: ['integer', 'null'] },
        gf: { type: ['integer', 'null'] }, // first goal
        gw: { type: ['integer', 'null'] }, // winning goal
        geq: { type: ['integer', 'null'] }, // equalizing goal
        ga: { type: ['integer', 'null'] }, // goals against (gk)
        pen: { type: ['integer', 'null'] }, // penalty shots
        peng: { type: ['integer', 'null'] }, // penalty goals
        s: { type: ['integer', 'null'] },
        st: { type: ['integer', 'null'] },
        f: { type: ['integer', 'null'] },
        fop: { type: ['integer', 'null'] },
        t: { type: ['integer', 'null'] },
        lb: { type: ['integer', 'null'] },
        p: { type: ['integer', 'null'] }, 
        pa: { type: ['integer', 'null'] },
        pap: { type: ['number', 'null'] },
        offs: { type: ['integer', 'null'] },
        c: { type: ['integer', 'null'] },
        cw: { type: ['integer', 'null'] },
        cwp: { type: ['number', 'null'] },
        d: { type: ['integer', 'null'] },
        spda:{ type: ['number', 'null'] },
        spdm: { type: ['number', 'null'] },
      }
    }
  }

  static get relationMappings() {
    return {
      season: {
        relation: Model.HasOneRelation,
        modelClass: getPath('season'),
        join: {
          from: [
            'season_player_statistics.season_id',
            'season_player_statistics.tournament_id'
          ],
          to: [
            'seasons.id',
            'seasons.tournament_id'
          ]
        }
      },
      player: {
        relation: Model.HasOneRelation,
        modelClass: getPath('player'),
        join: {
          from: 'season_player_statistics.player_id',
          to: 'players.id'
        }
      },
      team: {
        relation: Model.HasOneRelation,
        modelClass: getPath('team'),
        join: { 
          from: 'season_player_statistics.team_id',
          to: 'teams.id'
        }
      }
    }
  }
}