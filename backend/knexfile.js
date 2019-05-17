const config = require('./config')
const path = require('path')

module.exports = {
  client: 'pg',
  connection: {
    host: config.POSTGRES_HOST,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DATABASE
  },
  pool: { min: 0, max: 100 },
  migrations: {
    directory: path.join(__dirname, 'src', 'db', 'migrations')
  },
  debug: true
}