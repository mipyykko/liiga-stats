import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
// import mongoose from 'mongoose'
import config from 'config/index'

import routes from './routes'

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

const Promise = require('bluebird')

// mongoose.Promise = Promise
// mongoose.connect(config.MONGO_URI, { useNewUrlParser: true })
// mongoose.set('debug', true)

process.on('unhandledRejection', (error, p) => {
  console.log('=== UNHANDLED REJECTION ===')
  console.dir(error)
  process.exit(1)
})

app.use('/api', routes)

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`)
})

export default app
