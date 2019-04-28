import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  first_match: { type: Number, ref: 'Match', required: true }
})

export default mongoose.model('Season', schema)