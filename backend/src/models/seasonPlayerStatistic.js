import { PlayerStatisticModel } from 'models/base/playerStatistic'

export class SeasonPlayerStatistic extends PlayerStatisticModel {
  constructor(...args) {
    super(...args)
  }
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
    const baseSchema = PlayerStatisticModel.getJsonSchema()

    return {
      ...baseSchema,
      properties: {
        ...baseSchema.properties,
        gp: { type: 'integer' },
        isi: { type: 'number' },
        player_id: { type: 'integer' },
        tournament_id: { type: 'integer' },
        season_id: { type: 'integer' },
        team_id: { type: 'integer' },
      }
    }
  }

  static get relationMappings() {
    return {
      season: {
        relation: PlayerStatisticModel.HasOneRelation,
        modelClass: 'season',
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
        relation: PlayerStatisticModel.HasOneRelation,
        modelClass: 'player',
        join: {
          from: 'season_player_statistics.player_id',
          to: 'players.id'
        }
      },
      team: {
        relation: PlayerStatisticModel.HasOneRelation,
        modelClass: 'team',
        join: { 
          from: 'season_player_statistics.team_id',
          to: 'teams.id'
        }
      }
    }
  }
}