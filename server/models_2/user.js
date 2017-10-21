const mongoose = require('mongoose')
const Schema = mongoose.Schema

let helper = require('../helpers/login')
let userSchema = new Schema ({
  email: {
    type: String,
    required: [true, '{PATH} must be filled'],
    validate: {
      validator: function(val) {return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gi.test(val)},
      message: 'invalid {PATH} format'
    },
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, '{PATH} must be filled'],
    validate: {
      validator: function(val){ return /.{8,20}/.test(val)},
      message: `{PATH}'s length must be between 8 and 20 char`
    }
  },
  name: {type: String, required:[true, '{PATH} must be filled']},
  gender: {
    type: String,
    enum: {
      values: ['m', 'f'],
      message: `{PATH} should be [m | f]`
    }
  },
  phone: {
    type: String,
    validate: {
      validator: function(val){ return /^\+[0-9]{10,32}/gi.test(val) },
      message: `{PATH} must be between 10 and 32 char length and starts with +`
    },
    required: [true, '{PATH} must be filled']
  },
  poin: { type: Number, default: 0 },
  komsel : [{
    _komsel: {type: Schema.Types.ObjectId, ref: 'Komsel'},
    role: {
      type: String,
      lowercase: true,
      enum: {
        values: ['member', 'leader'],
        message: `{PATH} should be [member | leader]`
      }
    },
    joinDate: {type: Date, default: new Date()},
    activeStatus: {type: Boolean, default: true}
  }]
})

userSchema.pre('save', function(next) {
  if (this.isModified('password'))
    this._doc.password = helper.hashPassword(this._doc.password)
  next()
})

let User = mongoose.model('User', userSchema)
module.exports = User