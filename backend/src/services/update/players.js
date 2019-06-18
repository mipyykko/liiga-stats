import API from 'api'
import { Player } from 'models'
import _ from 'lodash'
import { convertTimeToSec, calculateFromPercentage } from 'utils'
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

const getInSubstitution = (subs, player_id) => _.pick(subs.find(s => s.opponent_player_id === player_id), ['player_id', 'minute', 'second'])
const getOutSubstitution = (subs, player_id) => _.pick(subs.find(s => s.player_id === player_id), ['opponent_player_id', 'minute', 'second'])

export const getPlayerStatistics = (match) => {
  const { match_id } = match

  const matchPlayers = filterEmptyNames(getUniquePlayersWithStats(match))

  // TODO: can return the wrong amount of passes when percentage is 0 -
  // to fix this, we need to go through the subevents
  return matchPlayers.map(player => ({
    ..._.pick(player, ['player_id', 'team_id']),
    ...player.statistics,
    match_id,
    p: calculateFromPercentage(player.statistics.pa, player.statistics.pap),
  }))
}

export const getMatchPlayers = (match) => {
  const { match_id } = match

  const matchPlayers = filterEmptyNames(getUniquePlayersWithStats(match))
  const subs = getSubstitutions(match)
  const lineups = getStartingLineUps(match)
  
  return matchPlayers.map(player => {
    const inSubstitution = getInSubstitution(subs, player.player_id)
    const outSubstitution = getOutSubstitution(subs, player.player_id)

    return {
      ..._.pick(player, ['player_id', 'team_id', 'number', 'position_id']),
      match_id,
      starting: isStarting(lineups, player.player_id),
      in_sub_second: convertTimeToSec(inSubstitution.minute, inSubstitution.second),
      out_sub_second: convertTimeToSec(outSubstitution.minute, outSubstitution.second),
      replaced_player_id: inSubstitution.player_id,
      replacement_player_id: outSubstitution.opponent_player_id
    }
  })
}

export const getPlayerStatisticsForTeam = (match, team_id) => {
  return getPlayerStatistics(match)
    .filter(p => p.team_id === team_id)
}

export const getUpdateablePlayers = async (players, options = { force: false }) => {
  const foundPlayers = await Player.query().findByIds(players.map(p => p.player_id))

  const insertablePlayers = filterEmptyNames(
    options.force ? players : _.pullAllBy(
      players, 
      foundPlayers
        .map(p => ({
          ...p,
          id: undefined,
          player_id: p.id,
        })), 
      'player_id')
  )

  const inserts = insertablePlayers.map(player => ({
    id: player.player_id,
    display_name: player.display_name,
    photo: player.photo
  }))

  return inserts
}

export const getUpdateablePlayersFromEvents = async (players, matches, options = { force: false }) => {
  if (!players || players.length === 0) {
    return []
  }

  // TODO: this should maybe update existing
  // if there were fields missing but they exist now
  
  const playerMap = _.reduce(players, (acc, curr) => ({ ...acc, [curr.id]: curr }), {})

  let updatedIds = players.filter(p => !!p.name).map(p => p.id)

  const inserts = _.flatten(await Promise.all(matches.map(async (match) => {
    const { match_id, players: matchPlayers, events } = match

    const matchPlayerIds = _.uniq(filterEmptyNames(matchPlayers).map(p => p.player_id))
    const notUpdatedYet = _.pullAll(matchPlayerIds, updatedIds)

    if (!events || !notUpdatedYet || notUpdatedYet.length === 0) {
      return
    }

    let detailedEvent, idx = 0

    while (idx < events.length && (!detailedEvent || !detailedEvent.players)) {
      detailedEvent = await API.fetchDetailedEvent(match_id, events[idx++].event_id)
    }

    if (!detailedEvent) {
      return 
    }

    const { players: eventPlayers } = detailedEvent

    const toBeUpdated = _.uniqBy(
      (eventPlayers || []).filter(p => _.includes(notUpdatedYet, p.id) && p.name_eng),
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
    Array.isArray(param) 
      ? param.map(match => match.players)
      : param.players),
  'player_id'
).filter(v => !!v)

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


export const playerStatsIsEmpty = (player) => !(Object.values(player.statistics).some(s => s))

export const getUniquePlayersWithStats = (param) => _.uniqBy(
  _.flatten(
    param instanceof Array
      ? param.map(match => getPlayersWithStats(match.players))
      : getPlayersWithStats(param.players)),
  'player_id'
)

export const filterEmptyNames = (players, field = 'display_name') => (players || []).filter(p => p[field] !== '')
