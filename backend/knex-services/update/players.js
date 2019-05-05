import API from 'api'
import Player from 'knex-models/player'
import MatchPlayerStatistic from 'knex-models/matchPlayerStatistic'
import _ from 'lodash'

import { getTactics } from './teams'

export const getStartingLineUps = (match) => {
  return getTactics(match)
    .filter(t => t.second === 0)
}

export const getStartingLineUp = (match, team_id) => {
  return getStartingLineUps(match)
    .filter(t => t.team_id === team_id)
}

export const getSubstitutions = (match) => {
  return _(match.events)
    .filter(event => event.type === 'sub')
    .map(event => _.pick(event, ['player_id', 'opponent_player_id', 'half', 'minute', 'second']))
    .sortBy(['half', 'minute', 'second'])
    .value()
}

const isStarting = (lineup, player_id) => lineup.some(t => t.player_id === player_id)

const getPlayerReplaced = (subs, player_id) => _.get(subs.find(s => s.opponent_player_id === player_id), 'player_id')
const getPlayerReplacement = (subs, player_id) => _.get(subs.find(s => s.player_id === player_id), 'opponent_player_id')

export const getPlayerStatistics = (match) => {
  const subs = getSubstitutions(match)
  const lineups = getStartingLineUps(match)

  return _.uniqBy(match.players, 'player_id').map(player => ({
    ..._.pick(player, ['player_id', 'team_id', 'number', 'position_id']),
    ...player.statistics,
    starting: isStarting(lineups, player.player_id),
    replaced_player_id: getPlayerReplaced(subs, player.player_id),
    replacement_player_id: getPlayerReplacement(subs, player.player_id)
  }))
}

export const getPlayerStatisticsForTeam = (match, team_id) => {
  return getPlayerStatistics(match)
    .filter(p => p.team_id === team_id)
}


export const updatePlayers = async (players, options = { force: false }) => {
  const foundPlayers = await Player.query().findByIds(players.map(p => p.player_id))

  const insertablePlayers = options.force ? foundPlayers : _.pullAllBy(
    players, 
    foundPlayers
      .map(p => ({
        ...p,
        id: undefined,
        player_id: p.id,
      })), 'player_id')

  const inserts = insertablePlayers.map(player => ({
    id: player.player_id,
    display_name: player.display_name,
    photo: player.photo
  }))

  return await Player
    .query()
    .update(inserts)
/*   return await Promise.all(players.map(async (player) => {
    const { player_id, display_name, photo } = player

    const foundPlayer = await Player.query().findById(player_id)

    if (!options.force && foundPlayer) {
      return foundPlayer
    }

    return await Player
      .query()
      .insert({
        id: player_id,
        display_name,
        photo
      })
  })) */
}

export const getUpdateablePlayers = async (players, options = { force: false }) => {
  const foundPlayers = await Player.query().findByIds(players.map(p => p.player_id))

  const insertablePlayers = options.force ? foundPlayers : _.pullAllBy(
    players, 
    foundPlayers
      .map(p => ({
        ...p,
        id: undefined,
        player_id: p.id,
      })), 'player_id')

  const inserts = insertablePlayers.map(player => ({
    id: player.player_id,
    display_name: player.display_name,
    photo: player.photo
  }))

  return inserts
}

export const updatePlayerStatistics = async (match, options = { force: false }) => {
  const { match_id } = match

  // players in match might have duplicates in some cases, so let's filter them 
  return await Promise.all(getUniquePlayers(match).map(async (player) => {
    const { player_id, statistics } = player

    // TODO: matchid

    return await MatchPlayerStatistic
      .query()
      .insert({
        player_id,
        match_id,
        ...statistics
      })
  }))
}

export const getUniquePlayers = (param) => _.uniqBy(
  _.flatten(
    param instanceof Array 
      ? param.map(match => match.players)
      : param.players),
  'player_id'
)
