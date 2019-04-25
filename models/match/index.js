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
  statistics: { type: mongoose.Schema.Types.Mixed, ref: 'TeamStatistics' }
}, { _id: false })

const GoalSchema = new mongoose.Schema({
  goal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
  score_first_team: Number,
  score_second_team: Number,
  scorer: String
}, { _id: false })

const PlayerSchema = new mongoose.Schema({
  player_id: { type: Number, ref: 'Player' },
  number: Number,
  position_id: Number,
  statistics: { type: mongoose.Schema.Types.Mixed, ref: 'PlayerStatistics' },
  team_id: { type: Number, ref: 'Team' } 
}, { _id: false })

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
  goals: [GoalSchema],//[{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }],
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
})

module.exports = mongoose.model('Match', schema)