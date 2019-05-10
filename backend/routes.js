const express = require('express')
const router = express.Router()
const { updateController } = require('controllers/update')
const { matchController } = require('controllers/matches')

router.get('/matches', matchController.getMatches)
router.get('/match/:matchid', matchController.getMatch)

router.post('/update/:tournamentid/:seasonid', updateController.postUpdateSeason)

router.post('/knex/update/:tournamentid/:seasonid', updateController.postKnexUpdateSeason)
router.get('/knex/match/:matchid', matchController.getKnexMatch)

/* router.use((error, req, res, next) => {
  if (!error) { 
    return next() 
  }

  res.status(error.status || 500)
  res.json({ error: error.message })
})
 */
module.exports = router