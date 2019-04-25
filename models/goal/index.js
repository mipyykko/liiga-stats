const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  scorer_id: { type: Number, ref: 'Player' },
  assistant_id: { type: Number, ref: 'Player' },
  match_id: { type: Number, ref: 'Match' },
  team_id: { type: Number, ref: 'Team' },
  half: Number,
  minute: Number,
  standard: Number,
  type: Number,
  side: Number,
  second: Number,
})

module.exports = mongoose.model('Goal', schema)