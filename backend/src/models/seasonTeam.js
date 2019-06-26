import { BaseModel } from 'models/base'

export class SeasonTeam extends BaseModel {
  static get tableName() {
    return 'season_teams'
  }

  static get idColumn() {
    return ['team_id', 'season_id', 'tournament_id']
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        team_id: { type: 'integer' },
        season_id: { type: 'integer' },
        tournament_id: { type: 'integer' }
      }
    }
  }
}
