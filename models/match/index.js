const mongoose = require('mongoose')

const schema = new mongoose.Schema({
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
/*   first_team_shirt_color: { type: String },
  second_team_shirt_color: { type: String },
  first_team_number_color: { type: String },
  second_team_number_color: { type: String }, */
  first_team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  second_team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  first_team_statistics: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamStatistics' },
  second_team_statistics: { type: mongoose.Schema.Types.ObjectId, ref: 'TeamStatistics' },
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
  goals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  tactics: [{ type: mongoose.Schema.Types.Mixed }],
  players: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
      player_id: Number,
      number: Number,
      position_id: Number,
      statistics: { type: mongoose.Schema.Types.ObjectId, ref: 'PlayerStatistics' },
      team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' } 
    } 
  ],
  success: Boolean,
  error: Boolean
})

module.exports = mongoose.model('Match', schema)