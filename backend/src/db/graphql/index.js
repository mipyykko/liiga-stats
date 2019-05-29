const graphql = require('graphql')
const graphQlBuilder = require('objection-graphql').builder
const forOwn = require('lodash/forOwn')

module.exports = () => {
  const models = require('models')
  
  // instead of snake_case, we create camelCase plural field names
  // and use just the entity name with the first letter lower cased as singular
  const graphQlSchema = Object.entries(models).reduce((builder, [name, model]) => 
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
    .build()

  return graphQlSchema
}

const camelCase = (s) => s.split('_').map((a, idx) => idx === 0 ? a : capitalize(a)).join('')
const capitalize = (s) => s[0].toUpperCase() + s.slice(1)
const decapitalize = (s) => s[0].toLowerCase() + s.slice(1)