const mongoose = require('mongoose')
const Schema = mongoose.Schema
let achievementSchema = new Schema ({
  name: String,
  tabelUsed: String,
  row: String,
  number: Number,
  poinEarned: Number,
  descr: String //anggota komsel nambah, jumlah game played, game won, game participated  
})

let Achievement = mongoose.model('Achievement', achievementSchema)
module.exports = Achievement