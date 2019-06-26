import * as graphql from 'graphql'
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools'
import { builder as graphQlBuilder } from 'objection-graphql'
import forOwn from 'lodash'
import models from 'models'
import { knex } from '..'

const camelCase = s =>
  s
    .split('_')
    .map((a, idx) => (idx === 0 ? a : capitalize(a)))
    .join('')
const capitalize = s => s[0].toUpperCase() + s.slice(1)
const decapitalize = s => s[0].toLowerCase() + s.slice(1)

// instead of snake_case, we create camelCase plural field names
// and use just the entity name with the first letter lower cased as singular

const graphQlSchema = Object.entries(models)
  .reduce(
    (builder, [name, model]) =>
      builder.model(model, {
        listFieldName: camelCase(model.getTableName()),
        fieldName: decapitalize(name)
      }),
    graphQlBuilder()
  )
  .argFactory((fields, modelClass) => {
    const args = {}

    forOwn(fields, (field, propName) => {
      if (
        field.type instanceof graphql.GraphQLObjectType ||
        field.type instanceof graphql.GraphQLList
      ) {
        return
      }

      args[propName + 'Uniq'] = {
        type: field.type,

        query: (query, value) => {
          query.distinct(value)
        }
      }
    })

    return args
  })
  .setBuilderOptions({ skipUndefined: true })
  .build()

const customSchema = `
  type PlayerSeason {
    tournament_id: Int!
    season_id: Int!
    team_id: Int!
  }

  extend type Players {
    seasons: [PlayerSeason]
  }

  extend type MatchPlayers {
    history_seasons: [Seasons]
    season_statistics: [SeasonPlayerStatistics]
  }

  type Query {
    player_seasons(player_id: Int!): [PlayerSeason]
    season_player_statistics(player_id: Int!, tournament_id: Int!, season_id: Int!): [SeasonPlayerStatistics],
  }
`

// TODO: at least isi needs to be limited to matches where status >= 5;
// some other fields may also need some pruning

const playerStats = {
  sum: [
    'g',
    'a',
    'mof',
    's',
    'st',
    'f',
    'fop',
    't',
    'lb',
    'p',
    'pa',
    'offs',
    'c',
    'cw',
    'gf',
    'gw',
    'geq',
    'ga',
    'd',
    'pen',
    'peng',
    'pena',
    'penga'
  ],
  avg: [],
  count: [{ gp: 'player_id' }],
  calculate_avg: [['pa', 'p', 'pap'], ['cw', 'c', 'cwp']],
  raw: [
    'avg(cast(nullif(isi, 0) as bigint)) isi'
  ],
  select: [
    'team_id',
    'matches.tournament_id',
    'matches.season_id'
  ]
}

const queryBuilder = (model, config) => {
  let query = model.query()

  query = config.sum.reduce((acc, curr) => acc.sum({ [curr]: curr }), query)
  query = config.avg.reduce((acc, curr) => acc.avg({ [curr]: curr }), query)
  query = config.count.reduce((acc, curr) => acc.count(curr), query)
  query = config.calculate_avg
    .reduce((acc, curr) => acc.select(
      knex.raw(`(cast(sum(${curr[0]}) as float) / cast(sum(${curr[1]}) as float) * 100) ${curr[2]}`)
    ), query)
  query = config.select.reduce((acc, curr) => acc.select(curr), query)
  query = config.raw.reduce((acc, curr) => acc.select(knex.raw(curr)), query)

  return query
}

const playerStatsSql =
  'team_id, count(player_id) gp, avg(cast(nullif(isi, 0) as bigint)) isi, ' +
  'sum(g) g, sum(a) a, sum(mof) mof, sum(s) s, sum(st) st, sum(f) f, sum(fop) fop, ' +
  'sum(t) t, sum(lb) lb, sum(p) p, sum(pa) pa, sum(offs) offs, sum(c) c, sum(cw) cw, ' +
  'sum(gf) gf, sum(gw) gw, sum(geq) geq, sum(ga) ga, ' +
  'sum(d) d, sum(pen) pen, sum(peng) peng, sum(pena) pena, sum(penga) penga, ' +
  '(cast(sum(pa) as float) / cast(sum(p) as float) * 100) pap, ' +
  '(cast(sum(cw) as float) / cast(sum(c) as float) * 100) cwp'

const teamStatsSql =
  'team_id, count(team_id) gp, sum(s) s, sum(st) st, sum(f) f, sum(p) p, ' +
  'sum(pa) pa, sum(bpm) bpm, sum(ck) ck, sum(c) c, sum(cw) cw, sum(offs) offs, ' +
  'sum(yc) yc, sum(rc) rc, sum(penf) penf, sum(pena) pena, ' +
  '(cast(sum(pa) as float) / cast(sum(p) as float) * 100) pap, ' +
  '(cast(sum(cw) as float) / cast(sum(c) as float) * 100) cwp, ' +
  'avg(bpp) bpp' // TODO: change to use bpt

const mergedSchema = mergeSchemas({
  schemas: [graphQlSchema, customSchema],
  resolvers: {
    MatchPlayers: {
      // TODO: now returns all player history - it's in wrong place, though
      season_statistics: async (obj, args, context, info) => {
        return await queryBuilder(models.MatchPlayerStatistic, playerStats)
          .where('player_id', obj.player.id)
          .leftJoin('matches', 'matches.id', 'match_player_statistics.match_id')
          .groupBy('team_id', 'matches.tournament_id', 'matches.season_id')
      }
    },
    Players: {
      seasons: async (obj, args, context, info) => {
        console.log('OBJ', obj, 'ARGS', args)
        return knex
          .distinct('season_id', 'tournament_id', 'match_players.team_id')
          .from('matches')
          .leftJoin('match_players', 'matches.id', 'match_players.match_id')
          .where('match_players.player_id', obj.id)
      }
    },
    Query: {
      // TODO: options to get history; get totals for season or per team
      season_player_statistics: async (obj, args, context, info) => {
        return await models.MatchPlayerStatistic.query()
          .select(knex.raw(playerStatsSql))
          .where('player_id', args.player_id)
          .whereIn('match_id', builder =>
            builder
              .select('id')
              .whereComposite(
                ['tournament_id', 'season_id'],
                [args.tournament_id, args.season_id]
              )
              .from('matches')
          )
          .groupBy('team_id')
      }
    }
  }
})

export default mergedSchema
