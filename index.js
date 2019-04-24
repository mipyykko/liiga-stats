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

mongoose.connect(MONGO_URI)

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

  const matches = await fetchTournamentSeason(tournamentid, seasonid)

  Promise.all(matches.map(async (match) => {
    const foundMatch = await Match.find({ match_id: match.match_id })

    if (foundMatch.length === 0 || (foundMatch.length > 1 && match.status > foundMatch[0].status)) {
      const doc = await fetchMatch(match.match_id)

      let newMatch = new Match()

      if (doc.status <= 1) {
        return
      }

      const { first_team, second_team } = doc

      const firstTeamSaved = await Team.findOneAndUpdate({
        team_id: first_team.team_id
      }, {
        $set: {
          name: first_team.name,
          logo: first_team.logo,
        }
      }, {
        new: true, upsert: true
      }).exec()

      const secondTeamSaved = await Team.findOneAndUpdate({
        team_id: second_team.team_id
      }, {
        $set: {
          name: second_team.name,
          logo: second_team.logo,
        }
      }, {
        new: true, upsert: true
      }).exec()

      const first_team_statistics = await new TeamStatistics({ 
        ...first_team.statistics,
        team_id: firstTeamSaved._id,
        match_id: doc._id 
      }).save()
      const second_team_statistics = await new TeamStatistics({ 
        ...second_team.statistics,
        team_id: secondTeamSaved._id,
        match_id: doc._id 
      }).save()

      const players = await Promise.all(doc.players.map(async (player) => {
        let foundPlayer = await Player.find({ player_id: player.player_id })

        const { player_id, display_name, photo, statistics, number, position_id, team_id } = player

        if (foundPlayer.length === 0) {
          foundPlayer = await new Player({
            player_id,
            player_name: display_name,
            display_name,
            photo
          }).save()
        }

        let playerStatistics = new PlayerStatistics({
          player: foundPlayer._id,
          match: newMatch._id,
          ...statistics
        })    
        
        playerStatistics = await playerStatistics.save()

        const matchPlayer = {
          _id: foundPlayer._id,
          player_id,
          position_id,
          team_id: player.team_id === first_team.team_id ? firstTeamSaved._id : secondTeamSaved._id,
          number,
          statistics: playerStatistics._id
        }

        // console.log(matchPlayer)
        return matchPlayer
      }))

      const goals = await Promise.all(doc.goals.map(async (goal) => {
        const scorer = players.find(player => player.player_id === goal.scorer.player_id)
        const assistant = goal.assistant ? players.find(player => player.player_id === goal.assistant.player_id) : null

        const newGoal = await new Goal({
          ..._.omit(goal, ['scorer', 'assistant']),
          team_id: goal.side === 1 ? firstTeamSaved._id : secondTeamSaved._id,
          scorer: scorer._id,
          match: newMatch._id,
          assistant: assistant ? assistant._id : null
        }).save()

        console.log(newGoal)

        return newGoal
      }))

      newMatch = Object.assign(newMatch, {
        ..._.omit(doc, ['goals', 'players', 'events', 'tactics']),
        players,
        goals: goals.map(goal => goal._id),
        first_team: firstTeamSaved._id,
        second_team: secondTeamSaved._id,
        first_team_statistics: first_team_statistics._id,
        second_team_statistics: second_team_statistics._id
      }) // was: new Match({})

      return newMatch.save()
    }

    return match
  }))
  .then(dummy => {
    res.json(dummy)
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})