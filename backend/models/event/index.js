const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  event_id: {
    type: Number,
    key: true
  },
  action_code: Number,
  type: String,
  minute: Number,
  second: Number,
  offset_left: Number,
  pos_x: Number,
  pos_y: Number,
  pos_dest_x: Number,
  pos_dest_y: Number,
  half: Number,
  title: String,
  fitness_available: Boolean,
  player_id: { type: Number, ref: 'Player' },
  //player_name: "Källman",
  opponent_player_id: { type: Number, ref: 'Player' },
  //opponent_player_name: "Volotinen",
  team_id: Number, // ref
  video_url: String
})

module.exports = mongoose.model('Event', schema)