const API = require('api')

const { getMatches, updateMatches } = require('./matches')
const { updatePlayers, getUniquePlayers } = require('./players')
const { updateTeams, getUniqueTeams } = require('./teams')


const updateSeason = async (tournamentid, seasonid, options = {}) => {
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

module.exports = { updateSeason }
