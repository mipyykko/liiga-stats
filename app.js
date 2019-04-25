require('app-module-path/register')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const app = express()

app.use(bodyParser.json())
app.use(cors())

const mongoose = require('mongoose')
const Promise = require('bluebird')
const config = require('./config')

mongoose.Promise = Promise
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true })

process.on('unhandledRejection', (error, p) => {
  console.log('=== UNHANDLED REJECTION ===')
  console.dir(error)
  process.exit(1)
})

app.use('/api', routes)

app.get('/', (req, res) => {
  res.json({})
})

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`)
})