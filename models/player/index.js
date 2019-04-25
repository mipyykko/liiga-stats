const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  _id: Number,
  player_id: {
    type: Number,
    //key: true
  },
  player_name: String,
  display_name: String,
  photo: String,
})

module.exports = mongoose.model('Player', schema)