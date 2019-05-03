import { Model } from 'db'

export default class Tournament extends Model {
  static get tableName() {
    return 'tournaments'
  }
}
