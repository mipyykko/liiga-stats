import API from 'api'

import { getMatches /*, updateMatches*/ } from './matches'
/* import { updatePlayers, getUniquePlayers } from './players'
import { updateTeams, getUniqueTeams } from './teams' */

const updateKnexService = {
  async updateSeason(tournamentid, seasonid, options = {}) {
    const seasonMatches = await API.fetchTournamentSeason(tournamentid, seasonid)

    const matches = await getMatches(seasonMatches, options)

    console.log(matches)
  }
}

export default updateKnexService