const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  team_id: {
    type: Number,
    key: true
  },
  name: { type: String },
  display_name: { type: String },
  logo: { type: String }
})

module.exports = mongoose.model('Team', schema)