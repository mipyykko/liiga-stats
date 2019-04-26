const { matchService } = require('services')
const { throwError } = require('util/error')

const matchController = {
  async getMatch(req, res, next) {
    const { matchid } = req.params
    
    if (!matchid) {
      throwError(400, 'no match id given')
    }

    try {
      const match = await matchService.findMatch(matchid)
      
      if (!match) {
        throwError(404, `no match with id ${matchid} found`)
      }

      res.json(match)
      next()
    } catch (err) {
      res.sendStatus(500)
      next(err)
    }
  },

  async getMatches(req, res, next) {
    const { tournament_id, season_id } = req.query

    try {
      const matches = await matchService.findMatches(tournament_id, season_id, { goals: true })

      res.json(matches).status(200)
    } catch (err) {
      res.sendStatus(500)
      next(err)
    }
  }
}

module.exports = matchController
