import { Model } from 'db'

export class Player extends Model {
  static get tableName() {
    return 'players'
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        surname: { type: 'string' },
        display_name: { type: 'string' },
        country: { type: 'string' },
        logo: { type: 'string' }
      }
    }
  }
}