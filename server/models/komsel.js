const mongoose = require('mongoose')
const Schema = mongoose.Schema
let komselSchema = new Schema ({
  name: {type: String, required: [true, `{PATH} must be filled`]},
  isApproved: {type: Boolean, default: false},
  approvedBy: {type: Schema.Types.ObjectId, ref: 'Admin'},
  createdDate: {type: Date, default: new Date()},
  tema: String,
  location: {
    lng: String,
    lat: String,
    city: String
  },
  popularity: {
    score: {type: Number, default: 0},
    totalVote: {type: Number, default: 0},
    totalScore: {type: Number, default: 0},
  },
  badge: [{descr:{type: Schema.Types.ObjectId, ref: 'Badge'}, unlockDate: {type: Date, default: New Date()}}],
  poin: Number,
  poinHistory: [{
    poin: Number,
    descr: String,
    tag: {
      type: String,
      enum: {
        values: ['add', 'subtract'],
        message: `{PATH} should be [add | subtract]`
      }
    }
  }],
  playHistory: [{type: Schema.Types.RoomId, ref: 'Room'}],
  achievement: [{
    descr: {type: Schema.Types.ObjectId, ref: 'Achievement'},
    unlockDate: {type: Date, default: New Date()}
  }],
  member: [{type: Schema.Types.ObjectId, ref: 'Member'}, role: String, joinDate: {type: Date, default: New Date()}],
  _creator: {type: Schema.Types.ObjectId, ref: 'User'},
  _leader: {type: Schema.Types.ObjectId, ref: 'User'},
  _church: {type: Schema.Types.ObjectId, ref: 'Church'}
})

let Komsel = mongoose.model('Komsel', komselSchema)
module.exports = Komsel