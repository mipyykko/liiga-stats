import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  scorer_id: { type: Number, ref: 'Player' },
  assistant_id: { type: Number, ref: 'Player' },
  match_id: { type: Number, ref: 'Match' },
  team_id: { type: Number, ref: 'Team' },
  half: Number,
  minute: Number,
  standard: Number,
  type: Number,
  side: Number,
  second: Number,
  first_team_score: Number,
  second_team_score: Number
}, { toJSON: { virtuals: true }})

schema.virtual('scorer', {
  ref: 'Player',
  localField: 'scorer_id',
  foreignField: '_id'
})

schema.virtual('assistant', {
  ref: 'Player',
  localField: 'assistant_id',
  foreignField: '_id'
})

schema.virtual('match', {
  ref: 'Match',
  localField: 'match_id',
  foreignField: '_id'
})

schema.virtual('team', {
  ref: 'Team',
  localField: 'team_id',
  foreignField: '_id'
})

export default mongoose.model('Goal', schema)