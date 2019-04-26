const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  match_id: { type: Number, ref: 'Match' },
  team_id: { type: Number, ref: 'Team' },
  bpp: Number,
  bpm: Number,
  s: Number,
  st: Number,
  ck: Number,
  f: Number,
  offs: Number,
  yc: Number,
  rc: Number,
  pa: Number,
  pap: Number,
  cw: Number,
  cwp: Number
})

module.exports = mongoose.model('TeamStatistics', schema)