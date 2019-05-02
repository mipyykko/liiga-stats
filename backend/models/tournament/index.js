import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  _id: Number,
  tournament_id: Number,
  name: String,
/*   seasons: [{ 
    season_id: Number,
    name: String,
    first_match: { type: Number, ref: 'Match' }
  }] */
})

export default mongoose.model('Tournament', schema)