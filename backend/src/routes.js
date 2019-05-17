import express from 'express'
import { updateController, matchController } from 'controllers'

const router = express.Router()

router.post('/update/:tournamentid/:seasonid', updateController.postUpdateSeason)
router.get('/match/:matchid', matchController.getMatch)

export default router
