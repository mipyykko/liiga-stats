import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  _id: Number,
  team_id: {
    type: Number,
    key: true
  },
  name: String,
  display_name: String,
  logo: String
})

export default mongoose.model('Team', schema)