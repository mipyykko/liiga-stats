import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  tournament_id: { type: Number, ref: 'Tournament', required: true },
  season_id: { type: Number, required: true },
  name: { type: String, required: true },
  first_match: { type: Number, ref: 'Match' },
})

export default mongoose.model('Season', schema)