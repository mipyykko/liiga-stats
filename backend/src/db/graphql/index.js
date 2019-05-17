const graphQlBuilder = require('objection-graphql').builder

module.exports = () => {
  const models = require('models')
  
  const graphQlSchema = Object.entries(models).reduce((builder, [name, model]) => 
    builder.model(model, {
      listFieldName: camelCase(model.getTableName()),
      fieldName: name[0].toLowerCase() + name.slice(1)
    }), 
  graphQlBuilder()).build()

  return graphQlSchema
}

const camelCase = (s) => s.split('_').map((a, idx) => idx === 0 ? a : a[0].toUpperCase() + a.slice(1)).join('')