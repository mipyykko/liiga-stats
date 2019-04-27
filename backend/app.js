require('app-module-path/register')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const morgan = require('morgan')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

const mongoose = require('mongoose')
const Promise = require('bluebird')
const config = require('./config')

mongoose.Promise = Promise
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true })
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