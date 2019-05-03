import API from 'api'
import Player from 'knex-models/player'
import MatchPlayerStatistic from 'knex-models/matchPlayerStatistic'
import _ from 'lodash'

export const updatePlayers = async (players, options = { force: false }) => {
  return await Promise.all(players.map(async (player) => {
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
  }))
}

export const updatePlayerStatistics = async (match, options = { force: false }) => {
  const { match_id } = match

  // players in match might have duplicates in some cases, so let's filter them 
  return await Promise.all(getUniquePlayers(match).map(async (player) => {
    const { player_id, statistics } = player

    // TODO: matchid
    console.log(statistics)
    
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
