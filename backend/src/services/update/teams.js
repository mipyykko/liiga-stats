import { Team } from 'models'
import { calculateFromPercentage } from 'utils'
import _ from 'lodash'

export const getUpdateableTeams = async (teams, options = { force: false }) => {
  const uniqTeams = getUniqueTeams(teams)

  const foundTeams = await Team.query().findByIds(uniqTeams.map(t => t.team_id))

  const insertableTeams = options.force ? uniqTeams : _.pullAllBy(uniqTeams, 
    (foundTeams || []).map(t => ({
      ...t,
      team_id: t.id,
      id: null
    })), 'team_id')

  const inserts = insertableTeams.map(team => ({
    id: team.team_id,
    name: team.name,
    display_name: team.name,
    logo: team.logo
  }))

  return inserts
}

// not used?
/* export const getUpdateableTeamMatchStatistics = async (team, match, options = { force: false }) => {
  const foundTeamStatistics = await MatchTeamStatistic
    .query()
    .findById([team.team_id, match.match_id])

  if (!options.force && !foundTeamStatistics) {
    return {}
  }

  return {
    team_id: team.team_id,
    match_id: match.match_id,
    ...team.statistics
  }
} */

export const getTeamStatistics = (match, team) => {
  const statistics = _.get(match, `[${team}_team]['statistics']`, {})

  return {
    match_id: match.match_id,
    team_id: _.get(match, `[${team}_team]['team_id']`),
    ...statistics,
    p: calculateFromPercentage(statistics.pa, statistics.pap),
    c: calculateFromPercentage(statistics.cw, statistics.cwp)
  }
}

export const getMatchTeam = (match, team) => {
  return {
    match_id: match.match_id,
    team_id: _.get(match, `${team}_team.team_id`),
    score: _.get(match, `score_${team}_team`),
    score_pen: _.get(match, `score_pen_${team}_team`),
    number_color: _.get(match, `${team}_team_number_color`),
    shirt_color: _.get(match, `${team}_team_shirt_color`),
    coach_name: _.get(match, `${team}_team_coach.name`),
    coach_surname: _.get(match, `${team}_team_coach.surname`)
  }
}

export const getTactics = (match) => {
  return _.flatten(
    (match.tactics || []).map(t => 
      t.tactics.map(tt => ({
        match_id: match.match_id,
        ..._.omit(tt, ['half', 'player_num'])
      }))
    )
  )
}

export const getTeamTactics = (match, team_id) => {
  return getTactics(match)
    .filter(t => t.team_id == team_id)
}

export const getUniqueTeams = (teams, by = 'team_id') => _.uniqBy(teams, by)

export const getUniqueTeamsFromMatches = (matches) => getUniqueTeams(
  _.flatten(matches.map(match => [match.first_team, match.second_team])), 
)

export const getSeasonTeams = (teams, tournamentId, seasonId) => 
  (teams || []).map(team => ({
    team_id: team.team_id, 
    tournament_id: tournamentId, 
    season_id: seasonId, 
  }))

