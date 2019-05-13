import API from 'api'
import { Player, MatchPlayerStatistic } from 'models'
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
  const { match_id } = match

  const matchPlayers = filterEmptyNames(getUniquePlayersWithStats(match))
  const subs = getSubstitutions(match)
  const lineups = getStartingLineUps(match)

  return matchPlayers.map(player => ({
    ..._.pick(player, ['player_id', 'team_id', 'number', 'position_id']),
    match_id,
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

export const getUpdateablePlayers = async (players, options = { force: false }) => {
  const foundPlayers = await Player.query().findByIds(players.map(p => p.player_id))

  const insertablePlayers = filterEmptyNames(
    options.force ? foundPlayers : _.pullAllBy(
      players, 
      foundPlayers
        .map(p => ({
          ...p,
          id: undefined,
          player_id: p.id,
        })), 'player_id')
  )

  const inserts = insertablePlayers.map(player => ({
    id: player.player_id,
    display_name: player.display_name,
    photo: player.photo
  }))

  return inserts
}

export const getUpdateablePlayersFromEvents = async (players, matches, options = { force: false }) => {
  const playerMap = _.reduce(players, (arr, el) => ({ ...arr, [el.id]: el}), {})

  let updatedIds = players.filter(p => !!p.name).map(p => p.id)

  const inserts = _.flatten(await Promise.all(matches.map(async (match) => {
/*     if (!updateableIds || updateableIds.length === 0) {
      return
    } */

    const { match_id, players: matchPlayers, events } = match

    const matchPlayerIds = _.uniq(filterEmptyNames(matchPlayers).map(p => p.player_id))
    const notUpdatedYet = _.pullAll(matchPlayerIds, updatedIds)

    if (!notUpdatedYet || notUpdatedYet.length === 0) {
      return
    }

    
    let detailedEvent, idx = 0

    while (idx < events.length && (!detailedEvent || !detailedEvent.players)) {
      detailedEvent = await API.fetchDetailedEvent(match_id, events[idx++].event_id)
    }

    const { players: eventPlayers } = detailedEvent

    const toBeUpdated = _.uniqBy(
      eventPlayers.filter(p => _.includes(notUpdatedYet, p.id) && p.name_eng),
      'id'
    ).map(p => ({
      ...playerMap[p.id],
      name: p.name_eng,
      surname: p.lastname_eng
    }))

    updatedIds = _.merge(updatedIds, toBeUpdated.map(p => p.id))

    return toBeUpdated
  })))

  return _.uniqBy(inserts.filter(v => !!v), 'id')
}

export const getUniquePlayers = (param) => _.uniqBy(
  _.flatten(
    param instanceof Array 
      ? param.map(match => match.players)
      : param.players),
  'player_id'
)

/**
 * Matches can have multiple entries for players. 
 * This returns the ones with statistics - if no entries with statistics
 * are found, returns the first.
 * 
 * @param {array} players from a match
 * @return {array} list of unique players  
 */
export const getPlayersWithStats = (players) => {
  const playersById = _.groupBy(players, 'player_id')

  return Object.values(playersById)
    .map(ps => {
      const playersWithStats = ps.filter(p => !playerStatsIsEmpty(p))
    
      return playersWithStats.length > 0 ? playersWithStats[0] : ps[0]
    })
    .filter(v => !!v)
}


export const playerStatsIsEmpty = (player) => !(Object.values(player.statistics).some(s => !s))

export const getUniquePlayersWithStats = (param) => _.uniqBy(
  _.flatten(
    param instanceof Array
      ? param.map(match => getPlayersWithStats(match.players))
      : getPlayersWithStats(param.players)),
  'player_id'
)

export const filterEmptyNames = (players, field = 'display_name') => players.filter(p => p[field] !== '')
