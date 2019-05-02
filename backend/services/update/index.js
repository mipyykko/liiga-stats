import API from 'api'

import { getMatches, updateMatches } from './matches'
import { updatePlayers, getUniquePlayers } from './players'
import { updateTeams, getUniqueTeams } from './teams'

const updateService = {
  async updateSeason(tournamentid, seasonid, options = {}) {
    const seasonMatches = await API.fetchTournamentSeason(tournamentid, seasonid)

    const matches = await getMatches(seasonMatches, options)

    const uniquePlayers = getUniquePlayers(matches)
    const uniqueTeams = getUniqueTeams(matches)
    
    // save new players
    const savedPlayers = await updatePlayers(uniquePlayers)

    console.log('updated %d players', savedPlayers.length)
    // save new teams
    const savedTeams = await updateTeams(uniqueTeams)
    console.log('updated %d teams', savedTeams.length)

    // handle matches
    const savedMatches = await updateMatches(matches, seasonid)
    console.log('updated %d matches', savedMatches.length)

    return savedMatches
  }
}

export default updateService