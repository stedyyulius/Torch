let Komsel = require('../models/komsel')
let User = require('../models/user')
let RequestJoinKomsel = require('../models/requestJoinKomsel')
let RequestExitKomsel = require('../models/requestExitKomsel')
let login = require('../helpers/login')

const getJoinKomsel = (req, res) => {
  RequestJoinKomsel.find((err,joins) => {
    res.send(err? {err:err} : joins)
  })

}

const getExitKomsel = (req, res) => {
  RequestExitKomsel.find((err,leaves) => {
    res.send(err? {err:err} : leaves)
  })
}

const getCreateKomsel = (req, res) => {
  Komsel.find({isApproved: false}, (err, komsels)=> {
    res.send(err? {err:err} : komsels)
  })
}

//baru request doang
//habis add react lsg addDt dari requestJoinKomsel
const addJoinKomsel = (req, res) => {
  // let decoded = login.getUserDetail(req.headers.token)
  // let _user = decoded._id || ''
  let email = req.body.email
  User.findOne({email: email}, (err, user)=> {
    if (err) res.send({err:'Invalid User'})
    else {
      let join = {}

      join._requestor = _user

      if (typeof req.params.idKomsel !== 'undefined') join._komsel = req.params.idKomsel

      let requestJoin = new RequestJoinKomsel(join)
      requestJoin.save((err, n_join) => {
        res.send(err ? {err:err} : n_join)
      })
    }
  })
}

const addExitKomsel = (req, res) => {
  // let decoded = login.getUserDetail(req.headers.token)
  // let _user = decoded._id || ''
  let email = req.body.email
  User.findOne({email:email}, (err, user)=> {
    if (err) res.send({err:'Invalid User'})
    else {
      let leave = {}
      leave._requestor = user._id

      if (typeof req.params.idKomsel !== 'undefined') leave._komsel = req.params.idKomsel

      let requestExit = new RequestExitKomsel(leave)
      requestExit.save((err, n_exit) => {
        res.send(err ? {err:err} : n_exit)
      })
    }
  })
}

module.exports = {
  getJoinKomsel,
  getExitKomsel,
  getCreateKomsel,
  addJoinKomsel,
  addExitKomsel,
}

