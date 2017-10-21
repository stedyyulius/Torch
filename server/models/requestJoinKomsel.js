const mongoose = require('mongoose')
const Schema = mongoose.Schema
let requestJoinKomselSchema = new Schema ({
  _komsel: {type: Schema.Types.ObjectId, ref: 'Komsel'},
  _requestor: {type: Schema.Types.ObjectId, ref: 'User'},
  createdDate: {type: Date, default: Date.now}
})

let RequestJoinKomsel = mongoose.model('RequestJoinKomsel', requestJoinKomselSchema)
module.exports = RequestJoinKomsel