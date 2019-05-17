import API from 'api'
import _ from 'lodash'
import { transaction } from 'objection'

import {
  getMatches,
  getUpdateableMatches,
  getForMatches
} from './matches'
import {
  getUniquePlayersWithStats,
  getUpdateablePlayers,
  getPlayerStatistics,
  getUpdateablePlayersFromEvents
} from './players'
import {
  getUniqueTeamsFromMatches,
  getUpdateableTeams,
  getTeamStatistics,
  getTeamInfo,
  getTactics
} from './teams'
import { getUpdateableTournaments } from './tournaments'
import { getUpdateableSeasons } from './seasons'
import { getMatchGoals } from './goals'
import { getMatchEvents } from './events'

import { insertMany, update } from 'services/common'

import { 
  Tournament, 
  Season,
  Match,
  Player,
  Team,
  MatchTeamStatistic,
  MatchPlayerStatistic,
  MatchTeamInfo,
  MatchTeamTactic,
  Goal,
  MatchEvent
} from 'models'

const updateService = {
  async updateSeason(tournamentid, seasonid, options = {}) {
    const seasons = await API.fetchTournamentSeasons(tournamentid)
    const seasonMatches = await API.fetchTournamentSeason(tournamentid, seasonid)

    const matches = await getMatches(seasonMatches, options)

    const updateableTournaments = await getUpdateableTournaments(seasons, tournamentid)
    const updateableSeasons = await getUpdateableSeasons(seasons, seasonid, tournamentid)

    const updateableMatches = await getUpdateableMatches(
      matches, tournamentid, seasonid,
//      { teamStatistics: true, teamInfo: true, teamTactics: true, playerStatistics: true, goals: true }
    )

    const uniquePlayers = getUniquePlayersWithStats(matches)
    const uniqueTeams = getUniqueTeamsFromMatches(matches)

    const updateableTeams = await getUpdateableTeams(uniqueTeams)
    const updateablePlayers = await getUpdateablePlayers(uniquePlayers)

    try {
      let updatedTeams, updatedPlayers, updatedPlayerDetails

      await transaction(Team, Player,
        async (Team, Player, trx) => {
          [updatedTeams, updatedPlayers] = await insertMany(
            [updateableTeams, updateablePlayers],
            [Team, Player],
            trx
          )

          const updateablePlayerDetails = await getUpdateablePlayersFromEvents(updatedPlayers, matches)

          updatedPlayerDetails = await update(updateablePlayerDetails, Player, trx)
        })

      let updatedMatches, updatedSeasons, updatedTournaments

      const ret = await transaction(Tournament, Match, Season,
        async (Tournament, Match, Season, trx) => {
          [updatedTournaments, updatedSeasons, updatedMatches] = await insertMany(
            [updateableTournaments, updateableSeasons, updateableMatches],
            [Tournament, Season, Match],
            trx)

/*           updatedMatches = await Promise.all(updateableMatches.map(m => Match
            .query(trx)
            .upsertGraph(m, { insertMissing: true }))) */
        })

      const updateableTeamStatistics = _.concat(
        getForMatches(matches, getTeamStatistics, 'first'),
        getForMatches(matches, getTeamStatistics, 'second')
      )
  
      const updateableTeamInfos = _.concat(
        getForMatches(matches, getTeamInfo, 'first'),
        getForMatches(matches, getTeamInfo, 'second')
      )

      const updateableTactics = _.flatten(getForMatches(matches, getTactics))

      const updateablePlayerStatistics = _.flatten(getForMatches(matches, getPlayerStatistics))
      const updateableGoals = _.flatten(getForMatches(matches, getMatchGoals))

      const updateableEvents = _.flatten(getForMatches(matches, getMatchEvents))

      const [
        updatedTeamStatistics,
        updatedTeamInfos,
        updatedPlayerStatistics,
        updatedTactics,
        updatedGoals,
        updatedEvents
      ] = await insertMany(
        [
          updateableTeamStatistics,
          updateableTeamInfos,
          updateablePlayerStatistics,
          updateableTactics,
          updateableGoals,
          updateableEvents
        ],
        [
          MatchTeamStatistic,
          MatchTeamInfo,
          MatchPlayerStatistic,
          MatchTeamTactic,
          Goal,
          MatchEvent
        ]
      )

/*       const updatedPlayerDetails = await getUpdateablePlayersFromEvents(uniquePlayers, matches)

      console.log(updatedPlayerDetails) */

      return {
        updated: {
          tournaments: updatedTournaments.map(t => t.id),
          seasons: updatedSeasons.map(s => [s.tournament_id, s.id]),
          teams: updatedTeams.map(t => t.id),
          team_statistics: updatedTeamStatistics.map(m => [m.team_id, m.match_id]),
          players: updatedPlayers.map(p => p.id),
          player_details: updatedPlayerDetails.map(p => p.id),
          player_statistics: updatedPlayerStatistics.map(p => [p.player_id, p.match_id, p.team_id]),
          matches: updatedMatches.map(m => m.id),
          team_infos: updatedTeamInfos.map(m => [m.match_id, m.team_id]),
          goals: updatedGoals.map(g => [g.match_id, g.home_team_score, g.away_team_score]),
          tactics: updatedTactics.map(t => [t.team_id, t.match_id, t.player_id, t.second]),
          events: updatedEvents.map(e => [e.id, e.match_id, e.action_code])
        }
      }
    } catch (err) {
      console.log(err, 'oh crud!')

      return {
        error: err.name
      }
    }
  }
}

export default updateService