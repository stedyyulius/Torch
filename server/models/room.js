const mongoose = require('mongoose')
const Schema = mongoose.Schema
let roomSchema = new Schema ({
  name: String,
  _game: {type: Schema.Types.ObjectId, ref: 'Game'},
  isOnline: Boolean,
  _winner: {type: Schema.Types.ObjectId, ref: 'Komsel'},
  creator: {
    _komsel: {type: Schema.Types.ObjectId, ref: 'Komsel'},
    _user: {type: Schema.Types.ObjectId, ref: 'User'},
    createdDate: {type: Date, default: Date.now}
  },
  rules: {
    maxUser: Number,
    minUser: Number,
    offline: {
      location: {
        lat: String,
        lng: String,
        name: String
      },
      time: Date,
      referee: {type: Schema.Types.ObjectId, ref: 'Staff'},
      description: String
    },
    maxRegis: Date
  },
  image:String,
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

let Room = mongoose.model('Room', roomSchema)
module.exports = Room