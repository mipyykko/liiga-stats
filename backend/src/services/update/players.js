import API from 'api'
import { Player, PlayerSeason } from 'models'
import _ from 'lodash'
import { convertTimeToSec, calculateFromPercentage } from 'utils'
import { getTactics } from './teams'

export const getStartingLineUps = match => {
  return getTactics(match).filter(t => t.second === 0)
}

export const getStartingLineUp = (match, team_id) => {
  return getStartingLineUps(match).filter(t => t.team_id === team_id)
}

export const getSubstitutions = match => {
  return _(match.events)
    .filter(event => event.type === 'sub')
    .map(event =>
      _.pick(event, [
        'player_id',
        'opponent_player_id',
        'half',
        'minute',
        'second'
      ])
    )
    .sortBy(['half', 'minute', 'second'])
    .value()
}

const isStarting = (lineup, player_id) =>
  lineup.some(t => t.player_id === player_id)

const getInSubstitution = (subs, player_id) =>
  _.pick(subs.find(s => s.opponent_player_id === player_id), [
    'player_id',
    'minute',
    'second'
  ])
const getOutSubstitution = (subs, player_id) =>
  _.pick(subs.find(s => s.player_id === player_id), [
    'opponent_player_id',
    'minute',
    'second'
  ])

export const getPlayerStatistics = (match, goalsWithStatuses) => {
  const { match_id } = match

  // TODO: maybe check the match status from db?
  // Or check existing stats in db and do not update if current are null?
  const matchPlayers = filterEmptyNames(getUniquePlayersWithStats(match))

  // TODO: can return the wrong amount of passes when percentage is 0 -
  // to fix this, we would need to go through the subevents
  return matchPlayers.map(player => ({
    ..._.pick(player, ['player_id', 'team_id']),
    ...player.statistics,
    match_id,
    p: calculateFromPercentage(player.statistics.pa, player.statistics.pap),
    ...getGoalStatuses(
      player,
      (goalsWithStatuses || []).filter(g => g.match_id === match_id)
    )
  }))
}

const getGoalStatuses = (player, goals) => {
  const playerGoals = goals.filter(g => g.scorer_id === player.player_id)
  const gkGoals = goals.filter(
    g => g.opposing_goalkeeper_id === player.player_id
  )

  return {
    gw: playerGoals.filter(g => g.winning).length || null,
    geq: playerGoals.filter(g => g.equalizing).length || null,
    gf: playerGoals.filter(g => g.first).length || null,
    ga: gkGoals.length || null,
    pen: null, // TODO: missed penalties
    peng: playerGoals.filter(g => g.standard === 6).length || null,
    pena: null, // TODO: ditto
    penga: gkGoals.filter(g => g.standard === 6).length || null
  }
}

export const getMatchPlayers = match => {
  const { match_id } = match

  const matchPlayers = filterEmptyNames(getUniquePlayersWithStats(match))
  // const subs = getSubstitutions(match)
  const lineups = getStartingLineUps(match)

  return matchPlayers.map(player => {
    /*     const inSubstitution = getInSubstitution(subs, player.player_id)
    const outSubstitution = getOutSubstitution(subs, player.player_id) */

    return {
      ..._.pick(player, ['player_id', 'team_id', 'number', 'position_id']),
      match_id,
      starting: isStarting(lineups, player.player_id)
      /*       in_sub_second: convertTimeToSec(inSubstitution.minute, inSubstitution.second),
      out_sub_second: convertTimeToSec(outSubstitution.minute, outSubstitution.second),
      replaced_player_id: inSubstitution.player_id,
      replacement_player_id: outSubstitution.opponent_player_id */
    }
  })
}

/* export const getPlayerStatisticsForTeam = (match, goalsWithStatuses, team_id) => {
  return getPlayerStatistics(match, goalsWithStatuses)
    .filter(p => p.team_id === team_id)
} */

export const getUpdateablePlayers = async (
  players,
  options = { force: false }
) => {
  const foundPlayers = await Player.query().findByIds(
    players.map(p => p.player_id)
  )

  const insertablePlayers = filterEmptyNames(
    options.force
      ? players
      : _.pullAllBy(
          players,
          foundPlayers.map(p => ({
            ...p,
            id: undefined,
            player_id: p.id
          })),
          'player_id'
        )
  )

  const inserts = insertablePlayers.map(player => ({
    id: player.player_id,
    display_name: player.display_name,
    photo: player.photo
  }))

  return inserts
}

export const getUpdateablePlayerSeasons = async (
  players,
  tournament_id,
  season_id,
  options = { force: false }
) => {
  const filteredPlayers = filterEmptyNames(players)

  const ids = filteredPlayers.map(p => [
    p.player_id,
    p.team_id,
    Number(tournament_id),
    Number(season_id)
  ])

  const foundPlayerSeasons = await PlayerSeason.query().findByIds(ids)

  const insertablePlayerSeasonsPlayers = options.force
    ? filteredPlayers
    : _.pullAllWith(
      filteredPlayers,
      foundPlayerSeasons,
      (a, b) => a.player_id === b.player_id && a.team_id === b.team_id
    )

  const inserts = insertablePlayerSeasonsPlayers.map(p => ({
    player_id: p.player_id,
    tournament_id: Number(tournament_id),
    season_id: Number(season_id),
    team_id: p.team_id
  }))

  return inserts
}

export const getUpdateablePlayersFromEvents = async (
  players,
  matches,
  options = { force: false }
) => {
  if (!players || players.length === 0) {
    return []
  }

  // TODO: this does not check for players in db

  // TODO: this should maybe update existing
  // if there were fields missing but they exist now

  const playerMap = _.reduce(
    players,
    (acc, curr) => ({ ...acc, [curr.id]: curr }),
    {}
  )

  // ids of players that have a first name in the list
  let updatedIds = players.filter(p => !!p.name).map(p => p.id)

  const inserts = _.flatten(
    await Promise.all(
      matches.map(async match => {
        const { match_id, players: matchPlayers, events } = match

        // ids of unique non-empty players of this match
        const matchPlayerIds = _.uniq(
          filterEmptyNames(matchPlayers).map(p => p.player_id)
        )
        // ids of players in this match that are not yet updated
        const notUpdatedYet = _.pullAll(matchPlayerIds, updatedIds)

        if (!events || !notUpdatedYet || notUpdatedYet.length === 0) {
          return
        }

        let detailedEvent,
          idx = 0

        while (
          idx < events.length &&
          (!detailedEvent || !detailedEvent.players)
        ) {
          detailedEvent = await API.fetchDetailedEvent(
            match_id,
            events[idx++].event_id
          )
        }

        if (!detailedEvent) {
          return
        }

        const { players: eventPlayers } = detailedEvent

        // find unique ids of event players, who are not updated yet and have a name
        const toBeUpdated = _.uniqBy(
          (eventPlayers || []).filter(
            p => _.includes(notUpdatedYet, p.id) && p.name_eng
          ),
          'id'
        )
          .map(p => {
            if (!playerMap[p.id]) {
              return null
            }

            return {
              ...playerMap[p.id],
              name: p.name_eng,
              surname: p.lastname_eng
            }
          })
          .filter(v => !!v)

        // update the id list
        updatedIds = _.merge(updatedIds, toBeUpdated.map(p => p.id))

        return toBeUpdated
      })
    )
  )
  // returns list of player objects

  return _.uniqBy(inserts.filter(v => !!v), 'id')
}

export const getUniquePlayers = (data, by = 'player_id') =>
  _.uniqWith(
    _.flatten(
      Array.isArray(data) ? data.map(match => match.players) : data.players
    ),
    fieldComparator(by)
  ).filter(v => !!v)

/**
 * Matches can have multiple entries for players.
 * This returns the ones with statistics - if no entries with statistics
 * are found, returns the first.
 *
 * @data,  {array} players from a match
 * @return {array} list of unique players
 */
export const getPlayersWithStats = players => {
  const playersById = _.groupBy(players, 'player_id')

  return Object.values(playersById)
    .map(ps => {
      const playersWithStats = ps.filter(p => !playerStatsIsEmpty(p))

      return playersWithStats.length > 0 ? playersWithStats[0] : ps[0]
    })
    .filter(v => !!v)
}

export const playerStatsIsEmpty = player =>
  !Object.values(player.statistics).some(s => s)

export const getUniquePlayersWithStats = (data, by = 'player_id') =>
  _.uniqWith(
    _.flatten(
      Array.isArray(data)
        ? data.map(match => getPlayersWithStats(match.players))
        : getPlayersWithStats(data.players)
    ),
    fieldComparator(by)
  )

const fieldComparator = (by) => (a, b) => {
  if (Array.isArray(by)) {
    return by.every(field => _.get(a, field) === _.get(b, field))
  }

  return _.get(a, by) === _.get(b, by)
}

export const filterEmptyNames = (players, field = 'display_name') =>
  (players || []).filter(p => p[field] !== '')
