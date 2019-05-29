import API from 'api'
import { Match } from 'models'
import _ from 'lodash'

import { 
  getTeamStatistics, 
  getTeamInfo,
  getTeamTactics,
} from './teams'
import {
  getPlayerStatisticsForTeam,
} from './players'
import { getMatchGoals } from './goals'

export const getMatches = async (matches, options = { force: false }) => {
  const foundMatches = await Match.query().findByIds(matches.map(m => m.match_id))

  const fetchableMatches = options.force
    ? matches
    : matches.filter(match => {
      const foundMatch = foundMatches.find(m => m.id == match.match_id)

      // TODO: more criteria on when to fetch --- more complete stats etc.
      // TODO: don't try to get matches after current date
      return !foundMatch || match.status > foundMatch.status
    })

  return (await Promise.all(fetchableMatches.map(async (match) => await API.fetchMatch(match.match_id)))).filter(v => !!v)
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

    return {
      id: Number(match_id),
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
    }
  })
}

export const getForMatches = (matches, fn, ...params) => {
  return matches.map(match => fn(match, ...params)).filter(v => !!v)
}
