import config from 'config'
import { Model } from 'objection'
import Knex from 'knex'

const knex = Knex({
  client: 'pg',
  connection: {
    host: config.POSTGRES_HOST,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DATABASE
  }
})

Model.knex(knex)

export { knex, Model }