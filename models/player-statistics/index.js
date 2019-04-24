const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  isi: Number,
  cw: Number,
  t: Number,
  fop: Number,
  pap: Number,
  g: Number,
  a: Number,
  spdm: Number,
  mof: Number,
  s: Number,
  c: Number,
  spda: Number,
  offs: Number,
  d: Number,
  f: Number,
  lb: Number,
  st: Number,
  cwp: Number,
  pa: Number,
})

module.exports = new mongoose.model('PlayerStatistics', schema)