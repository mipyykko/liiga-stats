import Team from 'knex-models/team'
import MatchTeamStatistic from 'knex-models/matchTeamStatistic'

import _ from 'lodash'

export const getTeamStatistics = (match, team) => {
  return {
    match_id: match.match_id,
    team_id: match[`${team}_team`]['team_id'],
    ...match[`${team}_team`]['statistics']
  }
}

export const getTeamInfo = (match, team) => {
  return {
    match_id: match.match_id,
    team_id: match[`${team}_team`]['team_id'],
    score: match[`score_${team}_team`],
    score_pen: match[`score_pen_${team}_team`],
    number_color: match[`${team}_team_number_color`],
    shirt_color: match[`${team}_team_shirt_color`],
    coach_name: match[`${team}_team_coach_name`],
    coach_surname: match[`${team}_team_coach_surname`]
  }
}

export const getTactics = (match) => {
  return _.flatten(match.tactics.map(t => t.tactics))
}

export const getTeamTactics = (match, team_id) => {
  return getTactics(match)
    .filter(t => t.team_id == team_id)
    .map(tactic => ({
      team_id,
      match_id: match.match_id,
      ..._.pick(tactic, ['player_id', 'position', 'second'])
    }))
}

/////
export const updateTeams = async (teams, options = { force: false }) => {
  const uniqTeams = _.uniqBy(teams, 'team_id')

  const foundTeams = await Team.query().findByIds(uniqTeams.map(t => t.team_id))

  const insertableTeams = options.force ? uniqTeams : _.pullAllBy(uniqTeams, foundTeams, 'team_id')

  const inserts = insertableTeams.map(team => ({
    id: team.team_id,
    name: team.name,
    display_name: team.name,
    logo: team.logo
  }))
/*   return await Promise.all(_.uniqBy(teams, 'team_id').map(async (team) => {
    const { team_id, name, logo } = team

    const foundTeam = await Team.query().findById(team_id)
    
    if (!options.force && foundTeam) {
      return foundTeam
    }

    return await Team
      .query()
      .insert({
        id: team_id,
        name,
        display_name: name,
        logo
      })
  })) */
  return await Team
    .query()
    .insert(inserts)
}

export const getUpdateableTeams = async (teams, options = { force: false }) => {
  const uniqTeams = _.uniqBy(teams, 'team_id')

  const foundTeams = await Team.query().findByIds(uniqTeams.map(t => t.team_id))

  const insertableTeams = options.force ? uniqTeams : _.pullAllBy(uniqTeams, 
    foundTeams.map(t => ({
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

export const getUpdateableTeamMatchStatistics = async (team, match, options = { force: false }) => {
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
}

export const updateTeamStatistics = async (team, match) => {
  return await MatchTeamStatistic
    .query()
    .insert({
      team_id: team.team_id,
      match_id: match.match_id,
      ...team.statistics
    })
}

export const getUniqueTeams = (matches) => _.uniqBy(
  _.flatten(matches.map(match => [match.first_team, match.second_team])), 
  'team_id'
)