const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  _id: Number,
  player_id: {
    type: Number,
    //key: true
  },
  name: String,
  surname: String,
  player_name: String,
  display_name: String,
  photo: String,
}, { toJSON: { getters: true, virtuals: true }})

schema.virtual('fullname').get(function () { return this.name + ' ' + this.surname })

module.exports = mongoose.model('Player', schema)