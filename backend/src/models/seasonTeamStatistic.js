import { TeamStatisticModel } from 'models/base/teamStatistic'

export class SeasonTeamStatistic extends TeamStatisticModel {
  constructor(...args) {
    super(...args)
  }

  static get tableName() {
    return 'season_team_statistics'
  }

  static get idColumn() {
    return ['team_id', 'season_id', 'tournament_id']
  }

  static get jsonSchema() {
    const baseSchema = TeamStatisticModel.getJsonSchema()

    return {
      ...baseSchema,
      properties: {
        ...baseSchema.properties,
        gp: { type: 'integer' },
        team_id: { type: 'integer' },
        season_id: { type: 'integer' },
        tournament_id: { type: 'integer' }
      }
    }
  }
}
