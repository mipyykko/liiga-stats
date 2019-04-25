const { updateService } = require('../../services')
const { updateSeason } = updateService

const postUpdateSeason = async (req, res, next) => {
  const { tournamentid, seasonid } = req.params
  const { force } = req.query

  try {
    const updateResult = await updateSeason(tournamentid, seasonid)

    res.json(updateResult)
    next()
  } catch (err) {
    res.sendStatus(500)
    next(err)
  }
}

module.exports = { postUpdateSeason }