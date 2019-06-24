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
  getMatchPlayers,
  getPlayerStatistics,
  getUpdateablePlayersFromEvents
} from './players'
import {
  getUniqueTeamsFromMatches,
  getUpdateableTeams,
  getTeamStatistics,
  getMatchTeam,
  getTactics,
  getSeasonTeams,

} from './teams'
import { getUpdateableTournaments } from './tournaments'
import { getUpdateableSeasons } from './seasons'
import { getMatchGoals } from './goals'
import { getMatchEvents } from './events'

import { insertMany, update, upsert } from 'services/common'

import { 
  Tournament, 
  Season,
  Match,
  Player,
  Team,
  MatchTeamStatistic,
  MatchPlayerStatistic,
  MatchPlayer,
  MatchTeam,
  MatchTeamTactic,
  Goal,
  MatchEvent,
  SeasonTeam,
  SeasonPlayerStatistic,
  SeasonTeamStatistic
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

      // insert / update
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

      // insert
      const ret = await transaction(Tournament, Match, Season,
        async (Tournament, Match, Season, trx) => 
          [updatedTournaments, updatedSeasons, updatedMatches] = await insertMany(
            [updateableTournaments, updateableSeasons, updateableMatches],
            [Tournament, Season, Match],
            trx)

/*           updatedMatches = await Promise.all(updateableMatches.map(m => Match
            .query(trx)
            .upsertGraph(m, { insertMissing: true }))) */
      )

      const updateableTeamStatistics = _.concat(
        getForMatches(matches, getTeamStatistics, 'first'),
        getForMatches(matches, getTeamStatistics, 'second')
      )
  
      const updateableMatchTeams = _.concat(
        getForMatches(matches, getMatchTeam, 'first'),
        getForMatches(matches, getMatchTeam, 'second')
      )

      const updateableTactics = _.flatten(getForMatches(matches, getTactics))
      const updateableMatchPlayers = _.flatten(getForMatches(matches, getMatchPlayers))
      const updateableGoals = _.flatten(getForMatches(matches, getMatchGoals))
      const updateablePlayerStatistics = _.flatten(getForMatches(matches, getPlayerStatistics, updateableGoals))
      const updateableEvents = _.flatten(getForMatches(matches, getMatchEvents))

      const updateableSeasonTeams = getSeasonTeams(uniqueTeams, Number(tournamentid), Number(seasonid))

      // upsert stats
      const updatedPlayerStatistics = await upsert(updateablePlayerStatistics, MatchPlayerStatistic)
      const updatedTeamStatistics = await upsert(updateableTeamStatistics, MatchTeamStatistic) 

  /*       const [
        updatedPlayerStatistics,
        updatedTeamStatistics
      ] = await upsertMany(
        [
          updateablePlayerStatistics,
          updateableTeamStatistics
        ],
        [
          MatchPlayerStatistic,
          MatchTeamStatistic
        ]
      ) */

      const [
        updatedSeasonTeams,
        updatedMatchPlayers,
        updatedMatchTeams,
        updatedTactics,
        updatedGoals,
        updatedEvents
      ] = await insertMany(
        [
          updateableSeasonTeams,
          updateableMatchPlayers,
          updateableMatchTeams,
          updateableTactics,
          updateableGoals,
          updateableEvents
        ],
        [
          SeasonTeam,
          MatchPlayer,
          MatchTeam,
          MatchTeamTactic,
          Goal,
          MatchEvent
        ]
      )

      return {
        updated: {
          tournaments: updatedTournaments.map(t => getKey(t, Tournament)),
          seasons: updatedSeasons.map(s => getKey(s, Season)),
          teams: updatedTeams.map(t => getKey(t, Team)),
          team_statistics: updatedTeamStatistics.map(t => getKey(t, MatchTeamStatistic)),
          players: updatedPlayers.map(p => getKey(p, Player)),
          player_details: updatedPlayerDetails.map(p => getKey(p, Player)),
          player_statistics: updatedPlayerStatistics.map(p => getKey(p, MatchPlayerStatistic)),
          matches: updatedMatches.map(m => getKey(m, Match)),
          match_players: updatedMatchPlayers.map(m => getKey(m, MatchPlayer)),
          match_teams: updatedMatchTeams.map(t => getKey(t, MatchTeam)),
          season_teams: updatedSeasonTeams.map(t => getKey(t, SeasonTeam)),
          goals: updatedGoals.map(g => getKey(g, Goal)),
          tactics: updatedTactics.map(t => getKey(t, MatchTeamTactic)),
          events: updatedEvents.map(e => getKey(e, MatchEvent))
        }
      }
    } catch (err) {
      return {
        error: err.name
      }
    }
  }
}

const getKey = (data, entity) => {
  let id = entity.getIdColumn ? entity.getIdColumn() : 'id'

  if (!Array.isArray(id)) {
    return data[id]
  }

  return id.map(i => data[i])
}

export default updateService