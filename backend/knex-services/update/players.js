import API from 'api'
import Player from 'knex-models/player'
import MatchPlayerStatistic from 'knex-models/matchPlayerStatistic'
import _ from 'lodash'

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
