import { PlayerStatisticModel } from 'models/base/playerStatistic'

export class MatchPlayerStatistic extends PlayerStatisticModel {
  constructor(...args) {
    super(...args)
  }

  static get tableName() {
    return 'match_player_statistics'
  }

  static get idColumn() {
    return ['player_id', 'match_id'] // 'team_id'
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
    const baseSchema = PlayerStatisticModel.getJsonSchema()

    return {
      ...baseSchema,
      properties: {
        player_id: { type: 'integer' },
        match_id: { type: 'integer' },
        team_id: { type: 'integer' },
        ...baseSchema.properties
      }
    }
  }

  static get relationMappings() {
    return {
      match: {
        relation: PlayerStatisticModel.HasOneRelation,
        modelClass: 'match',
        join: {
          from: 'match_player_statistics.match_id',
          to: 'matches.id'
        }
      },
      player: {
        relation: PlayerStatisticModel.HasOneRelation,
        modelClass: 'player',
        join: {
          from: 'match_player_statistics.player_id',
          to: 'players.id'
        }
      },
      team: {
        relation: PlayerStatisticModel.HasOneRelation,
        modelClass: 'team',
        join: {
          from: 'match_player_statistics.team_id',
          to: 'teams.id' 
        }
      }
    }
  }
}
