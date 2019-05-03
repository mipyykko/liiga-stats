import { Model } from 'db'

export default class Season extends Model {
  static get tableName() {
    return 'seasons'
  }
}