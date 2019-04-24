const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  first_match: { type: Number, ref: 'Match', required: true }
})

module.exports = mongoose.model('Season', schema)