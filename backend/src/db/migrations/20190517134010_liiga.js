const path = require('path')
const schemaFile = path.join(__dirname, '..', 'schema', 'schema.psql')
const schema = require('fs').readFileSync(schemaFile).toString()

exports.up = knex => knex.schema.raw(schema)

exports.down = knex =>  knex.schema.raw(`
DROP TABLE IF EXISTS 
matches, tournaments, seasons, teams, match_team_infos, match_team_statistics,
players, match_player_statistics, match_events, match_team_tactics, goals CASCADE;
`)
