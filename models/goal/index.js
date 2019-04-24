const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  scorer: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  assistant: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  half: Number,
  minute: Number,
  standard: Number,
  type: Number,
  side: Number,
  second: Number,
})

module.exports = mongoose.model('Goal', schema)