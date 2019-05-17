import { Model } from 'objection'
import Knex from 'knex'

const knexConfig = require('../../knexfile')

const knex = Knex(knexConfig)

Model.knex(knex)

export { knex, Model }