const { updateService } = require('services')
const { updateSeason } = updateService

const updateController = {
  async postUpdateSeason (req, res, next) {
    const { tournamentid, seasonid } = req.params
    const { force = false } = req.query

    try {
      const updateResult = await updateSeason(tournamentid, seasonid, { force })

      res.json(updateResult)

      next()
    } catch (err) {
      res.sendStatus(500)
      next(err)
    }
  }
}

module.exports = updateController