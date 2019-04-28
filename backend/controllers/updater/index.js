import { updateService } from 'services'

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
  }
}

export default updateController