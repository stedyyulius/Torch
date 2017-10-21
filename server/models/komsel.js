const mongoose = require('mongoose')
const Schema = mongoose.Schema

let komselSchema = new Schema ({
  image: String,
  name: {type: String, required: [true, `{PATH} must be filled`]},
  isApproved: {type: Boolean, default: false},
  approvedBy: {type: Schema.Types.ObjectId, ref: 'Staff'},
  createdDate: {type: Date, default: Date.now},
  theme: String,
  ayat: String,
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
  // badge: {
  //   descr:{type: Schema.Types.ObjectId, ref: 'Badge'},
  //   unlockDate: {type: Date, default: Date.now}
  // },
  poin: {type: Number, default: 0},
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
  // playHistory: [{type: Schema.Types.ObjectId, ref: 'Room'}],
  achievement: [{
    descr: {type: Schema.Types.ObjectId, ref: 'Achievement'},
    unlockDate: {type: Date, default: Date.now}
  }],
  member: [
    {
      _member: {type: Schema.Types.ObjectId, ref: 'Member'},
      role: String,
      joinDate: {type: Date, default: Date.now}
    }
  ],
  _creator: {type: Schema.Types.ObjectId, ref: 'User'},
  _leader: {type: Schema.Types.ObjectId, ref: 'User'},
  _church: {type: Schema.Types.ObjectId, ref: 'Church'}
})

let Komsel = mongoose.model('Komsel', komselSchema)
module.exports = Komsel