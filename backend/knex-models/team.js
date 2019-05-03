import{ Model } from 'db'

export default class Team extends Model {
  static get tableName() {
    return 'teams'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        display_name: { type: 'string' },
        country: { type: 'string' },
        logo: { type: 'string' }
      }
    }
  }
}
