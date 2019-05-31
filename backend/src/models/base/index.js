import { Model } from 'db'
import path from 'path'

export class BaseModel extends Model {
  static get modelPaths() {
    return [path.join(__dirname, '..')]
  }
}