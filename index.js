const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const fetchPonyfill = require('fetch-ponyfill')
const Promise = require('bluebird')
const _ = require('lodash')

const Match = require('./models/match/')
const Team = require('./models/team/')
const TeamStatistics = require('./models/team-statistics/')
const Player = require('./models/player')
const PlayerStatistics = require('./models/player-statistics')
const Goal = require('./models/goal')

app.use(bodyParser.json())
app.use(cors())

const { fetch } = fetchPonyfill()

const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/liiga'

const INSTAT_API_URI = 'http://mc.instatfootball.com/api/v1/'

mongoose.Promise = Promise

mongoose.connect(MONGO_URI)

process.on('unhandledRejection', (error, p) => {
  console.log('=== UNHANDLED REJECTION ===')
  console.dir(error)
  process.exit(1)
})

const fetchTournamentSeason = (tournamentid, seasonid) => {
  return fetch(`${INSTAT_API_URI}/matches?locale=en&tournament_id=${tournamentid}&season_id=${seasonid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(data => {
      return data.json()
    })
}

const fetchMatch = (matchid) => {
  return fetch(`${INSTAT_API_URI}/matches/${matchid}?locale=en`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(data => {
      return data.json()
    })
}

app.get('/', (req, res) => {
  res.json({})
})

app.post('/update/:tournamentid/:seasonid', async (req, res) => {
  const { tournamentid, seasonid } = req.params

  console.log('got here with', tournamentid, seasonid)

  const seasonMatches = await fetchTournamentSeason(tournamentid, seasonid)

  // fetch matches that are new or updated
  const matches = await Promise.all(seasonMatches.map(async (match) => {
    const foundMatch = await Match.findOne({ match_id: match.match_id })

    if (foundMatch && match.status <= foundMatch.status) {
      return // Promise.resolve(foundMatch)// we've handled this match already
    }

    return await fetchMatch(match.match_id)
  })).filter(v => !!v)

  const allPlayers = _.flatten(matches.map(match => match.players))
  const uniquePlayers = _.uniqBy(allPlayers, 'player_id')

  const allTeams = _.flatten(matches.map(match => [match.first_team, match.second_team]))
  const uniqueTeams = _.uniqBy(allTeams, 'team_id')
  
  // save new players
  const savedPlayers = await Promise.all(uniquePlayers.map(async (player) => {
    const { player_id, display_name, photo } = player

    const foundPlayer = await Player.findOne({ _id: player_id })

    if (foundPlayer) {
      return foundPlayer
    }

    return await new Player({
      _id: player_id,
      player_id,
      player_name: display_name,
      display_name,
      photo
    }).save()
  }))

  // save new teams
  const savedTeams = await Promise.all(uniqueTeams.map(async (team) => {
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

  // handle matches
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

    let newMatch = new Match({ _id: match_id, match_id })

    if (status <= 1) {
      return // it's not played, don't do anything
    }

    const first_team_statistics = await new TeamStatistics({ 
      _id: {
        team_id: first_team.team_id,
        match_id: match.match_id
      }, 
      ...first_team.statistics,
    }).save()
    const second_team_statistics = await new TeamStatistics({ 
      _id: { 
        team_id: second_team.team_id,
        match_id: match.match_id
      }, 
      ...second_team.statistics,
    }).save()

    // players in match might have duplicates in some cases, so let's filter them 
    const matchUniquePlayers = _.uniqBy(players, 'player_id')

    const matchPlayers = await Promise.all(matchUniquePlayers.map(async (player) => {
      const { player_id, display_name, photo, statistics, number, position_id, team_id } = player

      let playerStatistics = await new PlayerStatistics({
        _id: { 
          player_id,
          match_id
        },
        ...statistics
      }).save()    

      const matchPlayer = {
        player_id,
        position_id,
        team_id: player.team_id === first_team.team_id ? first_team.team_id : second_team.team_id,
        number,
        statistics: playerStatistics._id
      }

      return matchPlayer
    }))

    const matchGoals = await Promise.all(goals.map(async (goal) => {
      const newGoal = await new Goal({
        ..._.omit(goal, ['scorer', 'assistant']),
        team_id: goal.side === 1 ? first_team.team_id : second_team.team_id,
        scorer_id: goal.scorer.player_id,
        match_id,
        assistant_id: goal.assistant ? goal.assistant.player_id : null
      }).save()

      return { ...newGoal._doc, scorer: goal.scorer }
    }))

    const sortedMatchGoals = _.orderBy(matchGoals, ['second'], ['asc']) // I think this is enough

    let score_first_team = 0, score_second_team = 0

    const sortedMatchGoalsWithScore = sortedMatchGoals.map(goal => { 
      score_first_team = goal.side === 1 ? (score_first_team + 1) : score_first_team
      score_second_team = goal.side === 2 ? (score_second_team + 1) : score_second_team

      return { goal_id: goal._id, score_first_team, score_second_team, scorer: goal.scorer.display_name }
    })

    newMatch = Object.assign(newMatch, {
      ..._.omit(match, ['goals', 'players', 'events', 'tactics', 'first_team', 'second_team']),
      season_id: Number(seasonid),
      players: matchPlayers,
      goals: sortedMatchGoalsWithScore, //matchGoals.map(goal => goal._id),
      first_team: { 
        team_id: first_team.team_id,
        name: first_team.name,
        coach: first_team_coach,
        number_color: first_team_number_color,
        shirt_color: first_team_shirt_color,
        statistics: first_team_statistics._id
      },
      second_team: { 
        team_id: second_team.team_id,
        name: second_team.name,
        coach: second_team_coach,
        number_color: second_team_number_color,
        shirt_color: second_team_shirt_color,
        statistics: second_team_statistics._id
      }
    }) // was: new Match({})

    return await newMatch.save()
  }).filter(v => !!v))
    .then(result => res.json(result))
    .catch(err => console.error(err))
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})