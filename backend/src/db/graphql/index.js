import * as graphql from 'graphql'
import { makeExecutableSchema, mergeSchemas } from 'graphql-tools'
import { builder as graphQlBuilder } from 'objection-graphql'
import forOwn from 'lodash'
import models from 'models'
import { knex } from '..'
import _ from 'lodash'

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

  extend type PlayerSeasons {
    matches: [Matches]
  }

  extend type Players {
    seasons: [PlayerSeasons]
    season_statistics(tournament_id: Int, season_id: Int): [SeasonPlayerStatistics]
  }

  extend type MatchPlayers {
    history_seasons: [Seasons]
    season_statistics(tournament_id: Int, season_id: Int, upto: Boolean): [SeasonPlayerStatistics]
  }

  type Query {
    player_seasons(player_id: Int!): [PlayerSeasons]
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
  count: [{ gp: 'matches.id' }],
  calculate_avg: [['pa', 'p', 'pap'], ['cw', 'c', 'cwp']],
  raw: [
    'avg(cast(nullif(isi, 0) as bigint)) isi'
  ],
  select: [
    'player_id',
/*     'season_id',
    'tournament_id', */
    'team_id,
    'matches.tournament_id',
    'matches.season_id',
    //'matches.date'
  ]
}

const queryBuilder = (model, config) => {
  let query = model.query()

  query = config.sum.reduce((acc, curr) => acc.sum({ [curr]: curr }), query)
  query = config.avg.reduce((acc, curr) => acc.avg({ [curr]: curr }), query)
  query = config.count.reduce((acc, curr) => acc.count(curr), query)
  query = config.calculate_avg
    .reduce((acc, curr) => acc.select(
      knex.raw(`case sum(${curr[1]}) when 0 then 0 else (cast(sum(${curr[0]}) as float) / cast(sum(${curr[1]}) as float) * 100) end ${curr[2]}`)
    ), query)
  query = config.select.reduce((acc, curr) => acc.select(curr), query)
  query = config.raw.reduce((acc, curr) => acc.select(knex.raw(curr)), query)

  return query
}

// not updated
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
      season_statistics: async (obj, args, context, info) => {
        console.log('OBJ', obj, 'ARGS', args)
        // TODO: total for season for all teams in competition
        // - can be done by removing team_id from select and from groupby
        //   but maybe it's better to leave it for the front

        // if match { tournament_id, season_id } queried, then use those
        // otherwise use season_statistics parameters,
        // fallback returns all player season statistics

        // upto flag gets statistics up to this game

        const tournament_id = args.tournament_id || _.get(obj, 'match.tournament_id')
        const season_id = args.season_id || _.get(obj, 'match.season_id')

        let query = queryBuilder(models.MatchPlayerStatistic, playerStats)
          .where('player_id', obj.player.id)
          .leftJoin('matches', 'matches.id', 'match_player_statistics.match_id')
          .joinRelation('[match, team]')

        if (tournament_id && season_id) {
          query = query
            .whereIn('match_id', builder =>
              builder
                .select('id')
                .whereComposite(
                  ['matches.tournament_id', 'matches.season_id'],
                  [tournament_id, season_id]
                )
                .andWhereRaw(args.upto ? `date <= to_timestamp(${Number(obj.match.date) / 1000})` : '')
                .from('matches')
            )
        }

        query = query.groupBy('team_id', 'matches.tournament_id', 'matches.season_id', 'match_player_statistics.player_id')

        return await query.execute()
      }
    },
    Players: {
      seasons: async (obj, args, context, info) => {
        return await models.PlayerSeason.query()
          .select('team_id', 'season.id', 'season.tournament_id')
          .distinct('player_id', 'player_seasons.tournament_id', 'season_id')
          .joinRelation('[season, team]')
          .eager('[team, season]')
          .where('player_seasons.player_id', obj.id)
      },
      season_statistics: async (obj, args, context, info) => {
        let query = queryBuilder(models.MatchPlayerStatistic, playerStats)
          .skipUndefined()
          .where('player_id', obj.id)
          .leftJoin('matches', 'matches.id', 'match_player_statistics.match_id')

        if (args.tournament_id && args.season_id) {
          query = query.whereIn('match_id', builder =>
            builder
              .select('id')
              .whereComposite(
                ['tournament_id', 'season_id'],
                [args.tournament_id, args.season_id]
              )
              .andWhere('date', '<=', 'match.date')
              .from('matches')
          )
        }

        query = query.groupBy('team_id', 'matches.tournament_id', 'matches.season_id', 'match_player_statistics.player_id')

        return await query
      }
    },
    PlayerSeasons: {
      // requires player, tournament, season and team ids to be
      // queried - returns 
      matches: async (obj, args, context, info) => {
        return await models.Match.query()
          .select('*')
          // TODO: more/less join/eager?
          .joinRelation('[home_team, away_team]')
          .eager('[home_team, away_team]')
          .whereIn('matches.id', builder => builder
            .distinct('match_id')
            .from('match_players')
            .whereComposite(
              ['tournament_id', 'season_id'],
              [obj.tournament_id, obj.season_id]
            )
            .andWhere('player_id', obj.player_id)
            .andWhere('team_id', obj.team_id)
            .groupBy('team_id', 'match_id')
          )
          .groupBy('matches.id', 'tournament_id', 'season_id', 'home_team.id', 'away_team.id')
      }
    },
    Query: {
      // TODO: options to get history; get totals for season or per team
      season_player_statistics: async (obj, args, context, info) => {
        return await queryBuilder(models.MatchPlayerStatistic, playerStats)
          .where('player_id', args.player_id)
          .leftJoin('matches', 'matches.id', 'match_player_statistics.match_id')
          .whereIn('match_id', builder =>
            builder
              .select('id')
              .whereComposite(
                ['tournament_id', 'season_id'],
                [args.tournament_id, args.season_id]
              )
              .from('matches')
          )
          .groupBy('team_id', 'player_id', 'matches.tournament_id', 'matches.season_id')
      }
    }
  }
})

export default mergedSchema
