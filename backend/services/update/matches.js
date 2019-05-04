import API from 'api'
import Match from 'models/match'
import _ from 'lodash'

import { updateTeamStatistics } from 'services/update/teams'
import { 
  updatePlayerStatistics, 
  updatePlayersFromDetailedEvent, 
  getMatchPlayers 
} from 'services/update/players'
import { updateGoals } from 'services/update/goals'
import { updateEvents } from 'services/update/events'

export const getMatches = async (matches, options = { force: false }) => {
  return (await Promise.all(matches.map(async (match) => {

    const foundMatch = await Match.findOne({ match_id: match.match_id })

    if (!options.force && foundMatch && match.status <= foundMatch.status) {
      return // Promise.resolve(foundMatch)// we've handled this match already
    }

    return await API.fetchMatch(match.match_id)
  }))).filter(v => !!v)
}

const getTactics = (match, team_id) => {
  /*
    tactics: [
      tactics: [{ player... team_id... }],
      second: 0
    ]
   */

  const teamTactics = match.tactics.map(row => {
    return {
      tactics: row.tactics.filter(t => t.team_id == team_id),
      second: row.second
    }  
  })
    .filter(r => r.tactics.length > 0)
    .map(r => ({
      tactics: r.tactics.map(tactic => {
        const { player_id, position, half, second } = tactic

        return { 
          player_id,
          position,
          half,
          second
        }
      }),
      second: r.second
    }))

  return teamTactics
}

export const updateMatches = async (matches, seasonid) => {
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
      tactics,
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
        first_team_tactics, second_team_tactics,
        matchPlayers, playerStatistics, 
        matchGoals, matchEvents,
        updatedPlayers

    // TODO: something prettier
    first_team_tactics = getTactics(match, first_team.team_id)
    second_team_tactics = getTactics(match, second_team.match_id)

    await Promise.all([
      updateTeamStatistics(first_team, match),
      updateTeamStatistics(second_team, match),
      updatePlayerStatistics(match)
    ]).then(data => {
      first_team_statistics = data[0]
      second_team_statistics = data[1]
      playerStatistics = data[2]

      matchPlayers = getMatchPlayers(match, playerStatistics)

      return updateGoals(match)
    }).then(data => {
      matchGoals = data

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

    // TODO: season needs an objectid
    // TODO: this also needs find and update, in case we are actually updating 
    const newMatch = Match.create({
      _id: match_id,
      match_id,
      ..._.omit(match, ['goals', 'players', 'events', 'tactics', 'first_team', 'second_team']),
      // season_id: Number(seasonid),
      players: matchPlayers,
      goals: matchGoals.map(goal => ({
        goal_id: goal._id,
        first_team_score: goal.first_team_score,
        second_team_score: goal.second_team_score,
      })), // sortedMatchGoalsWithScore
      events: matchEvents,
      first_team: {
        team_id: first_team.team_id,
        name: first_team.name,
        coach: first_team_coach,
        number_color: first_team_number_color,
        shirt_color: first_team_shirt_color,
        statistics_id: first_team_statistics._id,
        tactics: first_team_tactics,
      },
      second_team: { 
        team_id: second_team.team_id,
        name: second_team.name,
        coach: second_team_coach,
        number_color: second_team_number_color,
        shirt_color: second_team_shirt_color,
        statistics_id: second_team_statistics._id,
        tactics: second_team_tactics
      }
    })

    return newMatch
  }).filter(v => !!v))
}