import API from 'api'
import _ from 'lodash'
import { transaction } from 'objection'

import {
  getMatches, updateMatchesFirst,
  getUpdateableMatches,
  getForMatches
} from './matches'
import {
  updatePlayers, getUniquePlayers,
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
import { updateTournament, getUpdateableTournaments } from './tournaments'
import { updateSeason, getUpdateableSeasons } from './seasons'
import { getMatchGoals } from './goals'

import { insertMany, update } from 'knex-services/common'

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

    const updateableTournaments = await getUpdateableTournaments(seasons, tournamentid)
    const updateableSeasons = await getUpdateableSeasons(seasons, seasonid, tournamentid)

    const updateableMatches = await getUpdateableMatches(
      matches, tournamentid, seasonid,
//      { teamStatistics: true, teamInfo: true, teamTactics: true, playerStatistics: true, goals: true }
    )

    const uniquePlayers = getUniquePlayers(matches)
    const uniqueTeams = getUniqueTeamsFromMatches(matches)

    const updateableTeams = await getUpdateableTeams(uniqueTeams)
    const updateablePlayers = await getUpdateablePlayers(uniquePlayers)

    try {
      let updatedTeams, updatedPlayers, updatedPlayerDetails

      console.time('update teams and players')
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

      console.timeEnd('update teams and players')

      console.time('get updateable players from events')
      console.timeEnd('get updateable players from events')

      // TODO: put this in trx or smth...
/*       console.time('update player details') 

      console.timeEnd('update player details')  */

      let updatedMatches, updatedSeasons, updatedTournaments

      console.time('update tournaments, match, seasons')
      const ret = await transaction(Tournament, Match, Season,
        async (Tournament, Match, Season, trx) => {
          [updatedTournaments, updatedSeasons] = await insertMany(
            [updateableTournaments, updateableSeasons],
            [Tournament, Season],
            trx)

          updatedMatches = await Promise.all(updateableMatches.map(m => Match
            .query(trx)
            .upsertGraph(m, { insertMissing: true })))
        })
      console.timeEnd('update tournaments, match, seasons')

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

      console.time('update team stats, infos, player stats, tactics, goals')
      const [
        updatedTeamStatistics,
        updatedTeamInfos,
        updatedPlayerStatistics,
        updatedTactics,
        updatedGoals
      ] = await insertMany(
        [
          updateableTeamStatistics,
          updateableTeamInfos,
          updateablePlayerStatistics,
          updateableTactics,
          updateableGoals
        ],
        [
          MatchTeamStatistic,
          MatchTeamInfo,
          MatchPlayerStatistic,
          MatchTeamTactic,
          Goal
        ]
      )
      console.timeEnd('update team stats, infos, player stats, tactics, goals')

/*       const updatedPlayerDetails = await getUpdateablePlayersFromEvents(uniquePlayers, matches)

      console.log(updatedPlayerDetails) */

      return {
        updated: {
          tournaments: updatedTournaments.map(t => t.id),
          seasons: updatedSeasons.map(s => [s.tournament_id, s.id]),
          teams: updatedTeams.map(t => t.id),
          //team_statistics: updatedTeamStatistics.map(m => [m.team_id, m.match_id]),
          players: updatedPlayers.map(p => p.id),
          player_details: updatedPlayerDetails.map(p => p.id),
          //player_statistics: updatedPlayerStatistics.map(p => [p.player_id, p.match_id, p.team_id]),
          matches: updatedMatches.map(m => m.id),
          //team_infos: updatedTeamInfos.map(m => [m.match_id, m.team_id]),
          //goals: updatedGoals.map(g => g.id),
          //tactics: updatedTactics.map(t => [t.team_id, t.match_id, t.player_id, t.second]),
        }
      }
    } catch (err) {
      console.log(err, 'oh crud!')

      return {
        error: err
      }
    }
  }
}

export default updateKnexService