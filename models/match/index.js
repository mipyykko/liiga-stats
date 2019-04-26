const mongoose = require('mongoose')

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
  tournament_id: Number, // ref?
  season_id: Number,
  first_team: TeamSchema,
  second_team: TeamSchema,
/*   first_team_shirt_color: { type: String },
  second_team_shirt_color: { type: String },
  first_team_number_color: { type: String },
  second_team_number_color: { type: String }, */
/*   first_team: { type: Number, ref: 'Team' }, 
  second_team: { type: Number, ref: 'Team' },
  first_team_statistics: { type: mongoose.Schema.Types.Mixed, ref: 'TeamStatistics' },
  second_team_statistics: { type: mongoose.Schema.Types.Mixed, ref: 'TeamStatistics' }, */
/*   first_team: {
    team_id: { type: Number, ref: 'Team' },
    name: { type: String },
    logo: { type: String },
    statistics: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamStatistics' }
  },
  second_team: {
    team_id: { type: Number, ref: 'Team' },
    name: { type: String },
    logo: { type: String },
    statistics: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamStatistics' }
  }, */
  goals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }], // [GoalSchema]
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  tactics: [{ type: mongoose.Schema.Types.Mixed }],
  players: [PlayerSchema],
/*     {
      player_id: { type: Number, ref: 'Player' },
      number: Number,
      position_id: Number,
      statistics: { type: mongoose.Schema.Types.Mixed, ref: 'PlayerStatistics' },
      team_id: { type: Number, ref: 'Team' } 
    } 
  ], */
  success: Boolean,
  error: Boolean
}, { toJSON: { virtuals: true } })

/* schema.virtual('players.statistics', {
  ref: 'PlayerStatistics',
  localField: 'players.statistics_id', 
  foreignField: '_id',
}) */

module.exports = mongoose.model('Match', schema)