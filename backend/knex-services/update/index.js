import API from 'api'

import { knex } from 'db'
import { transaction } from 'objection'

import { 
  getMatches, updateMatchesFirst,
  getUpdateableMatches 
} from './matches'
import { 
  updatePlayers, getUniquePlayers,
  getUpdateablePlayers 
} from './players'
import { 
  updateTeams, getUniqueTeams,
  getUpdateableTeams
} from './teams'
import { updateTournament, getUpdateableTournaments } from './tournaments'
import { updateSeason, getUpdateableSeasons } from './seasons'

import Tournament from 'knex-models/tournament'
import Season from 'knex-models/season'
import Match from 'knex-models/match'
import Player from 'knex-models/player'
import Team from 'knex-models/team'

const updateKnexService = {
  async updateSeason(tournamentid, seasonid, options = {}) {
    const seasons = await API.fetchTournamentSeasons(tournamentid)
    const seasonMatches = await API.fetchTournamentSeason(tournamentid, seasonid)
    const matches = await getMatches(seasonMatches, options)

    const uniquePlayers = getUniquePlayers(matches)
    const uniqueTeams = getUniqueTeams(matches)

    const updateableTournaments = await getUpdateableTournaments(seasons, tournamentid)
    const updateableSeasons = await getUpdateableSeasons(seasons, seasonid, tournamentid)

    const updateableMatches = await getUpdateableMatches(matches, tournamentid, seasonid, { teamStatistics: true })
    const updateableTeams = await getUpdateableTeams(uniqueTeams)
    const updateablePlayers = await getUpdateablePlayers(uniquePlayers)

    try {
      const updatedTeams = updateableTeams.length === 0 ? null : await Team
        .query()
        .insert(updateableTeams)

      const updatedPlayers = updateablePlayers.length === 0 ? null : await Player
        .query()
        .insert(updateablePlayers)

      const ret = await transaction(Tournament, Match, Season, 
        async (Tournament, Match, Season, trx) => {
          await Promise.all(updateableTournaments.map(t => 
            Tournament
              .query(trx)
              .insert(t)  
          ))

          await Promise.all(updateableSeasons.map(s => 
            Season
              .query(trx)
              .insert(s)
          ))

          await Promise.all(updateableMatches.map(m => 
            Match
              .query(trx)
              .upsertGraph(m, { insertMissing: true }) // update
          ))
/*           const updatedTournaments = await Tournament
            .query(trx)
            .insert(updateableTournaments)

          const updatedSeasons = await Season
            .query(trx)
            .insert(updateableSeasons)

          const updatedMatches = await Match
            .query(trx)
            .insert(updateableMatches) */

        })  
    } catch(err) {
      console.log(err, 'oh crud!')
    }
/*     const updatedTournament = await updateTournament(seasons, tournamentid)

    const updatedSeason = await updateSeason(seasons, seasonid, tournamentid)

    const seasonMatches = await API.fetchTournamentSeason(tournamentid, seasonid)

    const matches = await getMatches(seasonMatches, options)

    const uniquePlayers = getUniquePlayers(matches)
    const uniqueTeams = getUniqueTeams(matches)

    const savedTeams = await updateTeams(uniqueTeams)

    const savedMatches = await updateMatchesFirst(matches, tournamentid, seasonid)

    const savedPlayers = await updatePlayers(uniquePlayers) */


    // const savedMatches = await updateMatches(matches, seasonid)

    // console.log(savedTeams)
  }
}

export default updateKnexService