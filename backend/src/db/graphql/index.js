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
        fieldName: decapitalize(name),
      }),
    graphQlBuilder(),
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
        },
      }
    })

    return args
  })
  .setBuilderOptions({ skipUndefined: true })
  .build()


const customSchema = `
  extend type MatchPlayers {
    season_statistics: [SeasonPlayerStatistics]
  }
`
const statsSql = 'count(player_id) gp, avg(cast(nullif(isi, 0) as bigint)) isi, ' + 
'sum(g) g, sum(a) a, sum(mof) mof, sum(s) s, sum(st) st, sum(f) f, sum(fop) fop, ' +
'sum(t) t, sum(lb) lb, sum(p) p, sum(pa) pa, sum(offs) offs, sum(c) c, sum(cw) cw, ' +
'sum(d) d, (cast(sum(pa) as float) / cast(sum(p) as float) * 100) pap, ' + 
'(cast(sum(cw) as float) / cast(sum(c) as float) * 100) cwp'

const mergedSchema = mergeSchemas({
  schemas: [graphQlSchema, customSchema],
  resolvers: {
    MatchPlayers: {
      season_statistics: async (obj, args, context, info) => {
        return await models.MatchPlayerStatistic.query()
          .select(
            knex.raw(statsSql),
          )
          .where('player_id', obj.player.id)
      },
    },
  },
})

export default mergedSchema
