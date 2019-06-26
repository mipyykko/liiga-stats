import { matchService } from 'services'
import { throwError } from 'utils/error'

const matchController = {
  async getMatch(req, res, next) {
    const { matchid } = req.params

    if (!matchid) {
      throwError(400, 'no match id given')
    }

    const match = await matchService.findMatch(matchid)

    if (!match) {
      throwError(404, `no match with id ${matchid} found`)
    }

    res.json(match)
    next()
  },

  async getTest(req, res, next) {
    const result = await matchService.test()

    res.json(result)
    next()
  }
}

export default matchController
