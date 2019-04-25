const express = require('express')
const router = express.Router()
const updater = require('./controllers/updater')

router.post('/update/:tournamentid/:seasonid', updater.postUpdateSeason)

module.exports = router