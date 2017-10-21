let User = require('../models/user')

const getUsers = (req, res) => {
  User.find((err, users)=> {
    res.send(err? {err:err}:users)
  })
}
const getUser = (req, res) => {
  let id = req.params.id
  User.findById(id, (err,user) => {
    res.send(err ? err : user)
  })
}

const getUserKomsel = (req, res) => {

}
const deleteUser = (req, res) => {
  let id = req.params.id;
  User.findById(id, (err,user) => {
    if (err) res.send({err: 'Invalid User'})
    else user.remove((err,deleted) => {res.send(err? err : deleted)})
  })
}
const editUser = (req, res) => {

}

module.exports = {
  getUsers,
  getUser,
  getUserKomsel,
  deleteUser,
  editUser
}