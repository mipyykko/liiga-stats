import API from 'api'
import { Match } from 'knex-models'
import _ from 'lodash'

import { 
  updateTeamStatistics, 
  getTeamStatistics, 
  getTeamInfo,
  getTeamTactics,
  getTactics,
} from './teams'
import {
  updatePlayerStatistics,
  getPlayerStatistics,
  getPlayerStatisticsForTeam,
  // updatePlayersFromDetailedEvent, 
  getMatchPlayers
} from './players'
import { getMatchGoals } from './goals'

export const getMatches = async (matches, options = { force: false }) => {
  const foundMatches = await Match.query().findByIds(matches.map(m => m.match_id))

  const fetchableMatches = options.force
    ? matches
    : matches.filter(match => {
      const foundMatch = foundMatches.find(m => m.id == match.match_id)

      return !foundMatch || match.status < foundMatch.status
    })

  return (await Promise.all(fetchableMatches.map(async (match) => await API.fetchMatch(match.match_id)))).filter(v => !!v)
  /*     return (await Promise.all(matches.map(async (match) => {
  
      const foundMatch = await Match.query().findById(match.match_id)
  
      if (!options.force && foundMatch && match.status <= foundMatch.status) {
        return // Promise.resolve(foundMatch)// we've handled this match already
      }
  
      return await API.fetchMatch(match.match_id)
    }))).filter(v => !!v) */
}

export const getUpdateableMatches = async (
  matches,
  tournament_id,
  season_id,
  options = {
    teamStatistics: false,
    teamInfo: false,
    teamTactics: false,
    playerStatistics: false,
    goals: false
  }) => {
  return matches.map(match => {
    const {
      first_team,
      second_team,
      score_first_team,
      score_second_team,
      match_id,
      status,
      round,
      date,
      min,
    } = match

    const { team_id: first_team_id } = first_team
    const { team_id: second_team_id } = second_team

    const [home_statistics, away_statistics] = ['first', 'second'].map(t => getTeamStatistics(match, t))
    const [home_team_info, away_team_info] = ['first', 'second'].map(t => getTeamInfo(match, t))
    const [home_team_tactics, away_team_tactics] = [first_team_id, second_team_id].map(t => getTeamTactics(match, t))
    const [home_players, away_players] = [first_team_id, second_team_id].map(t => getPlayerStatisticsForTeam(match, t))
    const goals = getMatchGoals(match)

    return {
      id: match_id,
      tournament_id: Number(tournament_id),
      season_id: Number(season_id),
      round,
      date,
      status,
      min,
      home_team_id: first_team_id,
      away_team_id: second_team_id,
      home_score: score_first_team,
      away_score: score_second_team,
      // TODO: separate...
      home_statistics: options.teamStatistics
        ? home_statistics
        : null,
      away_statistics: options.teamStatistics 
        ? away_statistics
        : null,
      home_team_info: options.teamInfo
        ? home_team_info
        : null,
      away_team_info: options.teamInfo
        ? away_team_info
        : null,
      home_team_tactics: options.teamTactics
        ? home_team_tactics
        : null,
      away_team_tactics: options.teamTactics
        ? away_team_tactics
        : null,
      home_players: options.playerStatistics
        ? home_players
        : null,
      away_players: options.playerStatistics
        ? away_players
        : null,
      goals: options.goals
        ? goals
        : null
    }
  })
}

export const getForMatches = (matches, fn, ...params) => {
  return matches.map(match => fn(match, ...params)).filter(v => !!v)
}

////
export const updateMatchesFirst = async (matches, tournament_id, season_id) => {
  return Promise.all(matches.map(async (match) => {
    const {
      first_team,
      second_team,
      score_first_team,
      score_second_team,
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
      status,
      round,
      date,
      min
    } = match

    return await Match
      .query()
      .insert({
        id: match_id,
        tournament_id: Number(tournament_id),
        season_id: Number(season_id),
        round,
        date,
        status,
        min,
        home_team_id: first_team.team_id,
        away_team_id: second_team.team_id,
        home_score: score_first_team,
        away_score: score_second_team
      })
  }))
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
    /*     first_team_tactics = getTactics(match, first_team.team_id)
        second_team_tactics = getTactics(match, second_team.match_id) */

    await Promise.all([
      updateTeamStatistics(first_team, match),
      updateTeamStatistics(second_team, match),
      updatePlayerStatistics(match)
    ])
    /*     .then(data => {
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
        }) */
    if (updatedPlayers.length > 0) {
      //
    }

    /*     const newMatch = Match.create({
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
    
        return newMatch */
    return
  }).filter(v => !!v))
}
