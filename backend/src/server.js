import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import { ApolloServer } from 'apollo-server-express'
import config from '../config'

import routes from './routes'

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

const schema = require('db/graphql')()

const apollo = new ApolloServer({
  schema: schema
})

process.on('unhandledRejection', (error, p) => {
  console.log('=== UNHANDLED REJECTION ===')
  console.dir(error)
  process.exit(1)
})

app.use('/api', routes)

apollo.applyMiddleware({ app })

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`)
})

export default app
