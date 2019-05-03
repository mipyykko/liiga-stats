import API from 'api'
import Match from 'knex-models/match'

export const getMatches = async (matches, options = { force: false }) => {
  return (await Promise.all(matches.map(async (match) => {

    const foundMatch = await Match.query().findById(match.match_id)

    if (!options.force && foundMatch && match.status <= foundMatch.status) {
      return // Promise.resolve(foundMatch)// we've handled this match already
    }

    return await API.fetchMatch(match.match_id)
  }))).filter(v => !!v)
}
