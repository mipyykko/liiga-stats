const fetchPonyfill = require('fetch-ponyfill')
const { fetch } = fetchPonyfill()

const config = require('../config')

class API { 
  static fetchTournamentSeason(tournamentid, seasonid) {
    return fetch(`${config.API_URI}/matches?locale=en&tournament_id=${tournamentid}&season_id=${seasonid}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(data => {
        return data.json()
      })
  }

  static fetchMatch(matchid) {
    return fetch(`${config.API_URI}/matches/${matchid}?locale=en`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(data => {
        return data.json()
      })
  }
}

module.exports = API