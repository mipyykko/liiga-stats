const API = require('api')
const _ = require('lodash')

const Match = require('models/match')
const Team = require('models/team')
const TeamStatistics = require('models/team-statistics')
const Player = require('models/player')
const PlayerStatistics = require('models/player-statistics')
const Goal = require('models/goal')
const Event = require('models/event')

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
  
const updatePlayers = async (players, options = { force: false }) => {
  return await Promise.all(players.map(async (player) => {
    const { player_id, display_name, photo } = player

    const foundPlayer = await Player.findOne({ _id: player_id })

    if (!options.force && foundPlayer) {
      return foundPlayer
    }

    // TODO: get full player names from full events!
    // first event should be enough
    // matches/m_id/events/e_id/full_events?locale=en
    return await Player.findOneAndUpdate({
      _id: player_id,
    }, {
      $set: {
        player_id,
        player_name: display_name,
        display_name,
        photo
      }
    }, {
      new: true, upsert: true
    }).exec()
  }))
}

const updateTeams = async (teams, options = { force: false }) => {
  return await Promise.all(teams.map(async (team) => {
    const { team_id } = team

    const foundTeam = await Team.findOne({ _id: team_id })
    
    if (!options.force && foundTeam) {
      return foundTeam
    }

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

const updateTeamStatistics = async (team, match) => {
  return await TeamStatistics.findOneAndUpdate({
    team_id: team.team_id,
    match_id: match.match_id
  }, { 
    $set: {
      ...team.statistics
    }
  }, { 
    new: true, upsert: true
  }).exec()
}

const updatePlayerStatistics = async (match) => {
  const { players, match_id } = match

  // players in match might have duplicates in some cases, so let's filter them 
  return await Promise.all(getUniquePlayers(match).map(async (player) => {
    const { player_id, statistics } = player

    return await PlayerStatistics.findOneAndUpdate({
      player_id,
      match_id,
    }, {
      $set: {
        ...statistics
      }
    }, {
      new: true, upsert: true
    }).exec()
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

        // TODO: find and update
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

const convertTimeToSec = (min, sec) => (min - 1) * 60 + sec

const mapEventToGoalId = (event, goals) => {
  if (event.type !== 'goal') {
    return
  }

  const { player_id, minute, second } = event

  return (goals.find(goal => goal.scorer_id == player_id && goal.second == convertTimeToSec(minute, second)) || {})._id
}

const shallowCompare = (obj1, obj2) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(key => obj1[key] === obj2[key])

const updateMatchEvents = async (match, matchGoals) => {
  const { goals, events, match_id, first_team, second_team } = match

  // sometimes events can appear doubled
  const uniqueEvents = _.uniqWith(events, shallowCompare)

  const uniqueEventIds = _.uniq(uniqueEvents.map(e => e.event_id)).length

/*   if (uniqueEventIds != uniqueEvents.length) {
    console.log("combined events at %d", match_id)

    const eventMap = _.reduce(uniqueEvents, (acc, curr) => ({ ...acc, [curr.event_id]: acc[curr.event_id] ? acc[curr.event_id] + 1 : 1 }), {})

    const repeatEventIds = Object.entries(eventMap).filter(k => k[1] > 1).map(k => Number(k[0]))

    const repeatedEvents = uniqueEvents.filter(event => _.includes(repeatEventIds, event.event_id))
  } */

  // TODO: opponent player_id === 0 => undefined/null

  return await Promise.all(uniqueEvents.map(async (event) => {
    const newEvent = await Event.findOneAndUpdate({
      event_id: event.event_id,
      match_id: match_id
    }, {
      $set: {
        goal_id: mapEventToGoalId(event, matchGoals),
        match_id,
        opponent_player_id: event.opponent_player_id === 0 ? null : event.opponent_player_id,
        ...event,         
      }
    }, {
      new: true, upsert: true
    })

    return newEvent
  }))
}

const updatePlayersFromDetailedEvent = async (matchid, events) => {
  var idx = 0

  while (idx < events.length) {
    const event = await API.fetchDetailedEvent(matchid, events[idx++].event_id)

    const { players } = event

    if (!players || players && players.length === 0) { 
      continue 
    }

    return Promise.all(_.uniqBy(players, 'id').map(async (player) => {
      const { id: player_id, name_eng: name, lastname_eng: surname, player_team: team_id } = player

      const foundPlayer = await Player.findOne({ _id: player_id })

      if (foundPlayer.name === name) {
        return // foundPlayer
      }
      
      if (!name) {
        // lineups seem to be padded with null players
        return
      }

      return await Player.findOneAndUpdate({
        _id: player_id,
      }, {
        $set: {
          player_id,
          name,
          surname
        }
      }, {
        new: true, upsert: true
      }).exec()
    }))
  }

  return []
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
        updateMatchGoals(match)
      ])
    }).then(data => {
      matchPlayers = data[0]
      matchGoals = data[1]

      return updateMatchEvents(match, matchGoals)
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

  console.log('updated %d players', savedPlayers.length)
  // save new teams
  const savedTeams = await updateTeams(uniqueTeams)
  console.log('updated %d teams', savedTeams.length)

  // handle matches
  const savedMatches = await updateMatches(matches, seasonid)
  console.log('updated %d matches', savedMatches.length)

  return savedMatches
}

module.exports = { updateSeason }
