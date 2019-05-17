import fetchPonyfill from 'fetch-ponyfill'
import config from '../../config'
const { fetch } = fetchPonyfill()

export default class API {
  static fetchTournamentSeasons(tournamentid) {
    return fetch(`${config.EXTERNAL_API_URI}/seasons?tournament_id=${tournamentid}`,
      { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(data => data.json())
      .catch(err => err.json())
  }

  static fetchTournamentSeason(tournamentid, seasonid) {
    return fetch(`${config.EXTERNAL_API_URI}/matches?locale=en&tournament_id=${tournamentid}&season_id=${seasonid}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(data => data.json())
      .catch(err => err.json())
  }

  static fetchMatch(matchid) {
    return fetch(`${config.EXTERNAL_API_URI}/matches/${matchid}?locale=en`,
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

  static fetchDetailedEvent(matchid, eventid) {
    return fetch(`${config.EXTERNAL_API_URI}/matches/${matchid}/events/${eventid}/full_events`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(data => data.json())
      .catch(err => {
        console.error('fetch detailed event errored on %d %d', matchid, eventid)

        return err
      })
  }
}
