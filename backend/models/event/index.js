import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  event_id: {
    type: Number,
    key: true
  },
  action_code: Number,
  type: String,
  half: Number,
  minute: Number,
  second: Number,
  offset_left: Number,
  pos_x: Number,
  pos_y: Number,
  pos_dest_x: Number,
  pos_dest_y: Number,
  title: String,
  fitness_available: Boolean,
  player_id: { type: Number, ref: 'Player' },
  opponent_player_id: { type: Number, ref: 'Player' },
  team_id: { type: Number, ref: 'Team' },
  goal_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal' },
  match_id: { type: Number, ref: 'Match' },
  video_url: String
})

export default mongoose.model('Event', schema)