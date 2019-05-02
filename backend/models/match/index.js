import mongoose from 'mongoose'
import fakegoose from 'fakegoose'

const TeamSchema = new mongoose.Schema({
  team_id: { type: Number, ref: 'Team' },
  name: String,
  logo: String,
  shirt_color: String,
  number_color: String,
  coach: {
    name: String,
    surname: String
  },
  statistics_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamStatistics' }
}, { _id: false, toJSON: { virtuals: true } })
//TeamSchema.plugin(fakegoose)

TeamSchema.virtual('statistics', {
  ref: 'TeamStatistics',
  localField: 'statistics_id',
  foreignField: '_id'
})

TeamSchema.virtual('team', {
  ref: 'Team',
  localField: 'team_id',
  foreignField: '_id'
})

const GoalSchema = new mongoose.Schema({
  goal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
  score_first_team: Number,
  score_second_team: Number,
  scorer: String
}, { _id: false, toJSON: { virtuals: true } })

const PlayerSchema = new mongoose.Schema({
  player_id: { type: Number, ref: 'Player' },
  team_id: { type: Number, ref: 'Team' },
  number: Number,
  position_id: Number,
  statistics_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PlayerStatistics' },
}, { _id: false, toJSON: { virtuals: true } })

// PlayerSchema.plugin(fakegoose)

PlayerSchema.virtual('statistics', {
  ref: 'PlayerStatistics',
  localField: 'statistics_id',
  foreignField: '_id',
})

PlayerSchema.virtual('player', {
  ref: 'Player',
  localField: 'player_id',
  foreignField: '_id',
})

// TODO: get rid of those subschemas and use just objectids

const schema = new mongoose.Schema({
  _id: Number,
  match_id: { 
    type: Number, 
    key: true 
  },
  name: String,
  score_first_team: Number,
  score_second_team: Number,
  score_pen_first_team: Number,
  score_pen_second_team: Number,
  date: Date,
  time: String,
  date_val: Number,
  status: Number,
  round: Number,
  min: Number,
  tournament_id: { type: Number, ref: 'Tournament' },
  season_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Season' },
  // TODO: just array of teams
  first_team: {
    coach: { 
      name: String,
      surname: String,
    },
    shirt_color: String,
    number_color: String,
    team_id: { type: Number, ref: 'Team' },
    statistics_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamStatistics' },
    // this just spams it 
    tactics: [{
      tactics: [{
        player_id: { type: Number, ref: 'Player' },
        position: Number,
        half: Number,
        second: Number
      }],
      second: Number
    }]
  },
  second_team: { 
    coach: { 
      name: String,
      surname: String,
    },
    shirt_color: String,
    number_color: String,
    team_id: { type: Number, ref: 'Team' },
    statistics_id: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamStatistics' },
    tactics: [{
      tactics: [{
        player_id: { type: Number, ref: 'Player' },
        position: Number,
        half: Number,
        second: Number
      }],
      second: Number
    }]
  },
  // first_team: TeamSchema,
  // how about:
  // first_team: { coach, shirt_color, team as ref }
  // or separate MatchInfo schema?
  // second_team: TeamSchema,
  // player_statistics: ...
  goals: [{ 
    score_first_team: Number,
    score_second_team: Number,
    goal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }
  }], // [GoalSchema]
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  tactics: [{ type: mongoose.Schema.Types.Mixed }], // ref: 'Tactics'
  players: [{
    player_id: { type: Number, ref: 'Player' },
    // TODO: this may need team_id as well... 'ow queer
    number: Number,
    position_id: Number,
    starting: Boolean,
    statistics_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PlayerStatistics' }
  }]//[PlayerSchema],
  // players: { player as ref, number, position_id? }
}, { toJSON: { virtuals: true } })

schema.virtual('player_statistics', {
  ref: 'PlayerStatistics',
  localField: 'players.statistics_id', 
  foreignField: '_id',
})

require('./methods')(schema)
// schema.plugin(fakegoose)

export default mongoose.model('Match', schema)