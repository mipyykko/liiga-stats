import API from 'api'
import _ from 'lodash'
import { knex } from 'db'
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
  updateTeams, getUniqueTeams,
  getUpdateableTeams,
  getTeamStatistics,
  getTeamInfo,
  getTactics
} from './teams'
import { updateTournament, getUpdateableTournaments } from './tournaments'
import { updateSeason, getUpdateableSeasons } from './seasons'
import { getMatchGoals } from './goals'

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

const insert = async (data, entity, trx = null) => {
  return !(data instanceof Array)
    ? await entity.query().insert(data)
    : await Promise.all(
      data.map(d => trx
        ? entity.query(trx).insert(d)
        : entity.query().insert(d)
      ))
}

const insertMany = async (data, entities, trx = null) => {
  return await Promise.all(
    (_.zip(data, entities)).map(async ([d, e]) => await insert(d, e, trx))
  )
}

const updateKnexService = {
  async updateSeason(tournamentid, seasonid, options = {}) {
    const seasons = await API.fetchTournamentSeasons(tournamentid)
    const seasonMatches = await API.fetchTournamentSeason(tournamentid, seasonid)

    const matches = await getMatches(seasonMatches, options)

    const updateableTournaments = await getUpdateableTournaments(seasons, tournamentid)
    const updateableSeasons = await getUpdateableSeasons(seasons, seasonid, tournamentid)

    const updateableMatches = await getUpdateableMatches(
      matches, tournamentid, seasonid,
      { teamStatistics: false, teamInfo: false, teamTactics: false, playerStatistics: false, goals: false }
    )

    const uniquePlayers = getUniquePlayers(matches)
    const uniqueTeams = getUniqueTeams(matches)

    const updateableTeams = await getUpdateableTeams(uniqueTeams)
    const updateablePlayers = await getUpdateablePlayers(uniquePlayers)

    try {
      const [updatedTeams, updatedPlayers] = await insertMany(
        [updateableTeams, updateablePlayers],
        [Team, Player]
      )

      const updateablePlayerDetails = await getUpdateablePlayersFromEvents(updatedPlayers, matches)

      // TODO: put this in trx or smth... 
      const updatedPlayerDetails = await Promise.all(updateablePlayerDetails.map(p => Player.query().update(p).where('id', p.id)))

      let updatedMatches, updatedSeasons, updatedTournaments

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

/*       const updatedPlayerDetails = await getUpdateablePlayersFromEvents(uniquePlayers, matches)

      console.log(updatedPlayerDetails) */

      return {
        updated: {
          tournaments: updatedTournaments.length,
          seasons: updatedSeasons.length,
          teams: updatedTeams.length,
          team_statistics: updatedTeamStatistics.length,
          players: updatedPlayers.length,
          player_details: updatedPlayerDetails.length,
          player_statistics: updatedPlayerStatistics.length,
          matches: updatedMatches.length,
          team_infos: updatedTeamInfos.length,
          goals: updatedGoals.length,
          tactics: updatedTactics.length,
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