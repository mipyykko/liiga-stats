const Player = require('models/player')
const PlayerStatistics = require('models/player-statistics')
const API = require('api')
const _ = require('lodash')

const { getUniquePlayers } = require('services/update/common')

const updatePlayers = async (players, options = { force: false }) => {
  return await Promise.all(players.map(async (player) => {
    const { player_id, display_name, photo } = player

    const foundPlayer = await Player.findOne({ _id: player_id })

    if (!options.force && foundPlayer) {
      return foundPlayer
    }

    // TODO: get full player names from full events!
    // first event should be enough
    // matches/m_id/events/e_id/full_events?locale=en
    return await Player.findOneAndUpdate({
      _id: player_id,
    }, {
      $set: {
        player_id,
        player_name: display_name,
        display_name,
        photo
      }
    }, {
      new: true, upsert: true
    }).exec()
  }))
}

const updatePlayerStatistics = async (match) => {
  const { players, match_id } = match

  // players in match might have duplicates in some cases, so let's filter them 
  return await Promise.all(getUniquePlayers(match).map(async (player) => {
    const { player_id, statistics } = player

    return await PlayerStatistics.findOneAndUpdate({
      player_id,
      match_id,
    }, {
      $set: {
        ...statistics
      }
    }, {
      new: true, upsert: true
    }).exec()
  }))
}

const updatePlayersFromDetailedEvent = async (matchid, events) => {
  var idx = 0

  while (idx < events.length) {
    const event = await API.fetchDetailedEvent(matchid, events[idx++].event_id)

    const { players } = event

    if (!players || players && players.length === 0) {
      continue
    }

    return Promise.all(_.uniqBy(players, 'id').map(async (player) => {
      const { id: player_id, name_eng: name, lastname_eng: surname, player_team: team_id } = player

      const foundPlayer = await Player.findOne({ _id: player_id })

      if (foundPlayer.name === name) {
        return // foundPlayer
      }

      if (!name) {
        // lineups seem to be padded with null players
        return
      }

      return await Player.findOneAndUpdate({
        _id: player_id,
      }, {
        $set: {
          player_id,
          name,
          surname
        }
      }, {
        new: true, upsert: true
      }).exec()
    }))
  }

  return []
}

const getMatchPlayers = (match, statistics) => {
  const { first_team, second_team, match_id, players } = match

  return getUniquePlayers(match).map(player => {
    const { player_id, position_id, team_id, number } = player

    return {
      player_id,
      position_id,
      team_id: team_id === first_team.team_id ? first_team.team_id : second_team.team_id,
      number,
      statistics_id: statistics.find(s => s.player_id === player_id)._id
    }
  })
}


module.exports = { updatePlayers, updatePlayerStatistics, updatePlayersFromDetailedEvent, getMatchPlayers }