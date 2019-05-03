import { updateService } from 'services'
import { updateKnexService } from 'knex-services'

const updateController = {
  async postUpdateSeason (req, res, next) {
    const { tournamentid, seasonid } = req.params
    const { force = false } = req.query

    try {
      const updateResult = await updateService.updateSeason(tournamentid, seasonid, { force })

      res.json(updateResult)

      next()
    } catch (err) {
      res.sendStatus(500)
      next(err)
    }
  },

  async postKnexUpdateSeason (req, res, next) {
    const { tournamentid, seasonid } = req.params
    const { force = false } = req.query

    try {
      const updateResult = await updateKnexService.updateSeason(tournamentid, seasonid, { force })

      res.json(updateResult)

      next()
    } catch (err) {
      res.sendStatus(500)
      next(err)
    }
  }
}

export { updateController }