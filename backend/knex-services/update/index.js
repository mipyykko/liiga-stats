import API from 'api'
import _ from 'lodash'
import { knex } from 'db'
import { transaction } from 'objection'

import { 
  getMatches, updateMatchesFirst,
  getUpdateableMatches,
  getForMatches
} from './matches'
import { 
  updatePlayers, getUniquePlayers,
  getUpdateablePlayers,
  getPlayerStatistics
} from './players'
import { 
  updateTeams, getUniqueTeams,
  getUpdateableTeams,
  getTeamStatistics,
  getTeamInfo,
  getTactics
} from './teams'
import { updateTournament, getUpdateableTournaments } from './tournaments'
import { updateSeason, getUpdateableSeasons } from './seasons'
import { getMatchGoals } from './goals'

import Tournament from 'knex-models/tournament'
import Season from 'knex-models/season'
import Match from 'knex-models/match'
import Player from 'knex-models/player'
import Team from 'knex-models/team'

import MatchTeamStatistic from 'knex-models/matchTeamStatistic'
import MatchPlayerStatistic from 'knex-models/matchPlayerStatistic'
import MatchTeamInfo from 'knex-models/matchTeamInfo'
import MatchTeamTactic from 'knex-models/matchTeamTactic'
import Goal from 'knex-models/goal'

const updateKnexService = {
  async updateSeason(tournamentid, seasonid, options = {}) {
    const seasons = await API.fetchTournamentSeasons(tournamentid)
    const seasonMatches = await API.fetchTournamentSeason(tournamentid, seasonid)
    const matches = await getMatches(seasonMatches, options)

    const uniquePlayers = getUniquePlayers(matches)
    const uniqueTeams = getUniqueTeams(matches)

    const updateableTournaments = await getUpdateableTournaments(seasons, tournamentid)
    const updateableSeasons = await getUpdateableSeasons(seasons, seasonid, tournamentid)

    const updateableMatches = await getUpdateableMatches(
      matches, tournamentid, seasonid, 
      { teamStatistics: false, teamInfo: false, teamTactics: false, playerStatistics: false, goals: false }
    )

    const updateableTeams = await getUpdateableTeams(uniqueTeams)
    const updateablePlayers = await getUpdateablePlayers(uniquePlayers)

    const updateableTeamStatistics = _.concat(
      getForMatches(matches, getTeamStatistics, 'first'),
      getForMatches(matches, getTeamStatistics, 'second')
    )

    const updateableTeamInfos = _.concat(
      getForMatches(matches, getTeamInfo, 'first'),
      getForMatches(matches, getTeamInfo, 'second')
    )
    
    const updateableTactics = getForMatches(matches, getTactics)

    const updateablePlayerStatistics = getForMatches(matches, getPlayerStatistics)

    const updateableGoals = _.flatten(getForMatches(matches, getMatchGoals))

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
        })
      
      const updatedTeamStatistics = await Promise.all(updateableTeamStatistics.map(t => 
        MatchTeamStatistic
          .query()
          .insert(t)
      ))

      const updatedTeamInfos = await Promise.all(updateableTeamInfos.map(t =>
        MatchTeamInfo
          .query()
          .insert(t)
      ))

      const updatedPlayerStatistics = await Promise.all(updateablePlayerStatistics.map(p => 
        MatchPlayerStatistic
          .query()
          .insert(p)
      ))
      
      const updatedTactics = await Promise.all(updateableTactics.map(t => 
        MatchTeamTactic
          .query()
          .insert(t)
      ))

      const updatedGoals = await Promise.all(updateableGoals.map(g => 
        Goal
          .query()
          .insert(g)
      ))

      return {
        updatedTournaments: updateableTournaments.length,
        updatedSeasons: updateableSeasons.length,
        updatedTeams: updateableTeams.length,
        updatedMatches: updateableMatches.length,
        updatedGoals: updatedGoals.length
      }
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