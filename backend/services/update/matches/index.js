const Match = require('models/match')
const _ = require('lodash')
const { updateTeamStatistics } = require('services/update/teams')
const { updatePlayerStatistics, updatePlayersFromDetailedEvent, getMatchPlayers } = require('services/update/players')
const { updateGoals } = require('services/update/goals')
const { updateEvents } = require('services/update/events')

const getMatches = async (matches, options = { force: false }) => {
  return (await Promise.all(matches.map(async (match) => {

    const foundMatch = await Match.findOne({ match_id: match.match_id })

    if (!options.force && foundMatch && match.status <= foundMatch.status) {
      return // Promise.resolve(foundMatch)// we've handled this match already
    }

    return await API.fetchMatch(match.match_id)
  }))).filter(v => !!v)
}

const updateMatches = async (matches, seasonid) => {
  // TODO: async parallel on the whole shebang?

  return Promise.all(matches.map(async (match) => {
    const {
      first_team, 
      second_team, 
      first_team_coach,
      second_team_coach,
      first_team_number_color,
      first_team_shirt_color,
      second_team_number_color,
      second_team_shirt_color,
      players, 
      goals,
      match_id, 
      status 
    } = match

    // let newMatch = Match.create({ _id: match_id, match_id })

    if (status <= 1) {
      return // it's not played, don't do anything
    }

    let first_team_statistics, second_team_statistics, 
        matchPlayers, playerStatistics, 
        matchGoals, matchEvents,
        updatedPlayers

    // TODO: something prettier

    await Promise.all([
      updateTeamStatistics(first_team, match),
      updateTeamStatistics(second_team, match),
      updatePlayerStatistics(match)
    ]).then(data => {
      first_team_statistics = data[0]
      second_team_statistics = data[1]
      playerStatistics = data[2]

      return Promise.all([
        getMatchPlayers(match, playerStatistics),
        updateGoals(match)
      ])
    }).then(data => {
      matchPlayers = data[0]
      matchGoals = data[1]

      return updateEvents(match, matchGoals)
    }).then(async data => {
      matchEvents = data

      updatedPlayers = await updatePlayersFromDetailedEvent(match.match_id, matchEvents)
    })
/*     const first_team_statistics = await updateTeamStatistics(first_team, match)
    const second_team_statistics = await updateTeamStatistics(second_team, match)

    const playerStatistics = await updatePlayerStatistics(match)

    const matchPlayers = getMatchPlayers(match, playerStatistics)
    const matchGoals = await updateMatchGoals(match)
    const matchEvents = await updateMatchEvents(match, matchGoals)

    const updatedPlayers = (await updatePlayersFromDetailedEvent(match.match_id, matchEvents)).filter(v => !!v) */

    if (updatedPlayers.length > 0) {
      // console.log('Updated %d player full names', updatedPlayers.length)
      // updatedPlayers.forEach(p => console.log('Updated', p.fullname))
    }

    // TODO: this also needs find and update, in case we are actually updating 
    const newMatch = Match.create({
      _id: match_id,
      match_id,
      ..._.omit(match, ['goals', 'players', 'events', 'tactics', 'first_team', 'second_team']),
      season_id: Number(seasonid),
      players: matchPlayers,
      goals: matchGoals.map(goal => goal._id), // sortedMatchGoalsWithScore
      events: matchEvents,
      first_team: { 
        team_id: first_team.team_id,
        name: first_team.name,
        coach: first_team_coach,
        number_color: first_team_number_color,
        shirt_color: first_team_shirt_color,
        statistics_id: first_team_statistics._id
      },
      second_team: { 
        team_id: second_team.team_id,
        name: second_team.name,
        coach: second_team_coach,
        number_color: second_team_number_color,
        shirt_color: second_team_shirt_color,
        statistics_id: second_team_statistics._id
      }
    })

    return newMatch
  }).filter(v => !!v))
}

module.exports = { getMatches, updateMatches }