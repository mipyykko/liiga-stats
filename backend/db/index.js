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
  },
  pool: { min: 0, max: 100 },
  //debug: true
})

Model.knex(knex)

export { knex, Model }