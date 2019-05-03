import API from 'api'

import { getMatches, updateMatchesFirst } from './matches'
import { updatePlayers, getUniquePlayers } from './players'
import { updateTeams, getUniqueTeams } from './teams'

const updateKnexService = {
  async updateSeason(tournamentid, seasonid, options = {}) {
    const seasonMatches = await API.fetchTournamentSeason(tournamentid, seasonid)

    // TODO: update tournament and season first b/c foreign keys :x

    const matches = await getMatches(seasonMatches, options)

    const uniquePlayers = getUniquePlayers(matches)
    const uniqueTeams = getUniqueTeams(matches)

    const savedTeams = await updateTeams(uniqueTeams)

    const savedMatches = await updateMatchesFirst(matches, tournamentid, seasonid)

    const savedPlayers = await updatePlayers(uniquePlayers)


    // const savedMatches = await updateMatches(matches, seasonid)

    console.log(savedTeams)
  }
}

export default updateKnexService