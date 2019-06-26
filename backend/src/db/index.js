import { Model } from 'objection'
import Knex from 'knex'
import * as knexConfig from '../../knexfile'

const knex = Knex(knexConfig)

Model.knex(knex)

export { knex, Model }
