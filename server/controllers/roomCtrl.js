let Room = require('../models/room')
let User = require('../models/user')

const getRooms = (req, res) => {
  let id = req.params.id
  Room.find((err, rooms) => {
    res.send(err? {err:err}: rooms)
  })
}

const getRoom = (req, res) => {
  let id = req.params.id
  Room.findById(id, (err, room) => {
    res.send(err? {err:err}: room)
  })
}

const addRoom = (req, res) => {
  User.findOne({email: req.body.email}, (err,user)=> {
    if (err) res.send({err:'Invalid User'})
    else if (user !== null) {
      let id = user._id
      let rules = {}
      let offline = {}

      if (typeof req.body.maxUser != 'undefined') rules.maxUser = req.body.maxUser
      if (typeof req.body.maxRegis != 'undefined') rules.maxRegis = Date(req.body.maxRegis)
      if (typeof req.body.minUser != 'undefined') rules.minUser = req.body.minUser
      if (typeof req.body.lat != 'undefined') {
        offline.location = {
          lat: req.body.lat,
          lng: req.body.lng,
          name: req.body.name,
        }
        if (typeof req.body.time != 'undefined') offline.time = Date(req.body.time)
        if (typeof req.body.description != 'undefined') offline.description = req.body.description

        rules.offline = offline
      }

      let room = {
        _game: req.body.game || '',
        creator: {
          _komsel: req.body.komsel || '',
          _user: id,
        },
        rules: rules
      }
      let n_room = new Room(room)

      n_room.save((err, n_room) => {
        if (err) {
          let err_msg = []
          for (let error in err.errors) err_msg.push(err.errors[error].message)
          res.send({err : err_msg.join(',')})
        } else res.send(n_room)
      })
    } else res.send({err:'User not found'})
  })
}

const deleteRoom = (req, res) => {
  let id = req.params.id

  Room.findById(id, (err, room) => {
    if(err) res.send({err: 'Invalid Room'})
    else room.remove((err,deleted) => {res.send(err? {err:err} : deleted)})
  })
}

const editRoom = (req, res) => {

}

module.exports = {
  getRooms,
  getRoom,
  addRoom,
  deleteRoom,
  editRoom,
}