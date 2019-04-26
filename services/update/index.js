const API = require('api')
const _ = require('lodash')

const Match = require('models/match')
const Team = require('models/team')
const TeamStatistics = require('models/team-statistics')
const Player = require('models/player')
const PlayerStatistics = require('models/player-statistics')
const Goal = require('models/goal')

const getUniquePlayers = (param) => _.uniqBy(
  _.flatten(
    param instanceof Array 
      ? param.map(match => match.players)
      : param.players),
  'player_id'
)

const getUniqueTeams = (matches) => _.uniqBy(
  _.flatten(matches.map(match => [match.first_team, match.second_team])), 
  'team_id'
)

const getMatches = async (matches, options = { force: false }) => {
  return (await Promise.all(matches.map(async (match) => {

    const foundMatch = await Match.findOne({ match_id: match.match_id })

    if (!options.force && foundMatch && match.status <= foundMatch.status) {
      return // Promise.resolve(foundMatch)// we've handled this match already
    }

    return await API.fetchMatch(match.match_id)
  }))).filter(v => !!v)
}
  
const updatePlayers = async (players) => {
  return await Promise.all(players.map(async (player) => {
    const { player_id, display_name, photo } = player

    const foundPlayer = await Player.findOne({ _id: player_id })

    if (foundPlayer) {
      return foundPlayer
    }

    return await Player.create({
      _id: player_id,
      player_id,
      player_name: display_name,
      display_name,
      photo
    }) //.save()
  }))
}

const updateTeams = async (teams) => {
  return await Promise.all(teams.map(async (team) => {
    return await Team.findOneAndUpdate({
      _id: team.team_id
    }, {
      $set: {
        team_id: team.team_id,
        name: team.name,
        logo: team.logo,
      }
    }, {
      new: true, upsert: true
    }).exec()      
  }))
}

const createTeamStatistics = async (team, match) => {
  return await TeamStatistics.create({
    team_id: team.team_id,
    match_id: match.match_id,
    ...team.statistics
  }) //.save()
}

const createPlayerStatistics = async (match) => {
  const { players, match_id } = match

  // players in match might have duplicates in some cases, so let's filter them 
  return await Promise.all(getUniquePlayers(match).map(async (player) => {
    const { player_id, statistics } = player

    return await PlayerStatistics.create({
      player_id,
      match_id,
/*       _id: { 
        player_id,
        match_id
      },*/
      ...statistics
    }) //.save()
  }))
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

const updateMatchGoals = async (match) => {
  const { goals, match_id, first_team, second_team } = match

  let first_team_score = 0, second_team_score = 0

  return await Promise.all(
    _.orderBy(goals, ['second'], ['asc'])
      .map(async (goal) => {
        // does not handle penalty kick contests
        first_team_score = goal.side === 1 ? ++first_team_score : first_team_score
        second_team_score = goal.side !== 1 ? ++second_team_score : second_team_score

        const newGoal = await Goal.create({
          ..._.omit(goal, ['scorer', 'assistant']),
          team_id: goal.side === 1 ? first_team.team_id : second_team.team_id,
          scorer_id: goal.scorer.player_id,
          assistant_id: goal.assistant ? goal.assistant.player_id : null,
          match_id,
          first_team_score,
          second_team_score
        })

        return newGoal //.save() //{ ...newGoal._doc, scorer: goal.scorer }
      })
  )
}

const updateMatches = async (matches, seasonid) => {
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

    const first_team_statistics = await createTeamStatistics(first_team, match)
    const second_team_statistics = await createTeamStatistics(second_team, match)

    const playerStatistics = await createPlayerStatistics(match)

    const matchPlayers = getMatchPlayers(match, playerStatistics)
    const matchGoals = await updateMatchGoals(match)

    const newMatch = Match.create({
      _id: match_id,
      match_id,
      ..._.omit(match, ['goals', 'players', 'events', 'tactics', 'first_team', 'second_team']),
      season_id: Number(seasonid),
      players: matchPlayers,
      goals: matchGoals.map(goal => goal._id), // sortedMatchGoalsWithScore
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

/*     newMatch = Object.assign(newMatch, {
      ..._.omit(match, ['goals', 'players', 'events', 'tactics', 'first_team', 'second_team']),
      season_id: Number(seasonid),
      players: matchPlayers,
      goals: matchGoals.map(goal => goal._id), // sortedMatchGoalsWithScore
      first_team: { 
        team_id: first_team.team_id,
        name: first_team.name,
        coach: first_team_coach,
        number_color: first_team_number_color,
        shirt_color: first_team_shirt_color,
        // statistics: first_team_statistics._id
      },
      second_team: { 
        team_id: second_team.team_id,
        name: second_team.name,
        coach: second_team_coach,
        number_color: second_team_number_color,
        shirt_color: second_team_shirt_color,
        // statistics: second_team_statistics._id
      }
    }) // was: new Match({}) */

    return newMatch //await newMatch.save()
  }).filter(v => !!v))
}

const updateSeason = async (tournamentid, seasonid, options = {}) => {
  const seasonMatches = await API.fetchTournamentSeason(tournamentid, seasonid)

  const matches = await getMatches(seasonMatches, options)

  const uniquePlayers = getUniquePlayers(matches)
  const uniqueTeams = getUniqueTeams(matches)
  
  // save new players
  const savedPlayers = await updatePlayers(uniquePlayers)

  // save new teams
  const savedTeams = await updateTeams(uniqueTeams)

  // handle matches
  return await updateMatches(matches, seasonid)
}

module.exports = { updateSeason }
