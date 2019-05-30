import { TeamStatisticModel } from 'models/base/teamStatistic'

export class MatchTeamStatistic extends TeamStatisticModel {
  constructor(...args) {
    super(...args)
  }

  static get tableName() {
    return 'match_team_statistics'
  }

  static get idColumn() {
    return ['team_id', 'match_id']
  }
  
  static get jsonSchema() {
    const baseSchema = TeamStatisticModel.getJsonSchema()

    return {
      ...baseSchema,
      properties: {
        team_id: { type: 'integer' },
        match_id: { type: 'integer' },
        ...baseSchema.properties
      }
    }
  }
}