import * as graphql from 'graphql'
import { builder as graphQlBuilder } from 'objection-graphql'
import forOwn from 'lodash'
import models from 'models'

const camelCase = (s) => s.split('_').map((a, idx) => idx === 0 ? a : capitalize(a)).join('')
const capitalize = (s) => s[0].toUpperCase() + s.slice(1)
const decapitalize = (s) => s[0].toLowerCase() + s.slice(1)

// instead of snake_case, we create camelCase plural field names
// and use just the entity name with the first letter lower cased as singular

const graphQlSchema = Object.entries(models)
  .reduce((builder, [name, model]) => 
    builder.model(model, {
      listFieldName: camelCase(model.getTableName()),
      fieldName: decapitalize(name)
    }), 
  graphQlBuilder())
  .argFactory((fields, modelClass) => {
    const args = {}

    forOwn(fields, (field, propName) => {
      if (field.type instanceof graphql.GraphQLObjectType 
        || field.type instanceof graphql.GraphQLList) {
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

export default graphQlSchema

