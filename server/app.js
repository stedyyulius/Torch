require('dotenv').config()

const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const port = process.env.PORT || 3000
let index = require('./routes/index')
// let user = require('./routes/user')
let staff = require('./routes/staff')
let game = require('./routes/game')
// let room = require('./routes/room')
let deck = require('./routes/deck')
// let request = require('./routes/request')
let reward = require('./routes/reward')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(cors())

app.use('/', index)
// app.use('/user', user)
app.use('/staff', staff)
app.use('/game', game)
// app.use('/room', room)
app.use('/deck', deck)
// app.use('/request', request)
app.use('/reward', reward)

let envi = app.settings.env || 'development'

let db_config = {
  'development': 'mongodb://localhost/torch',
}

mongoose.connect(db_config[envi],(err,res) => {
  console.log(db_config[envi])
  console.log(err?err:'Berhasil connect ke db '+db_config[envi])
})

app.set('port', port)

app.listen(app.get('port'), () => {
  console.log('magic happen at port:',app.get('port'))
})

module.exports = app
