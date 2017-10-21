let Komsel = require('../models/komsel')
let Staff = require('../models/staff')
let User = require('../models/user')

let RequestJoinKomsel = require('../models/requestJoinKomsel')
let RequestExitKomsel = require('../models/requestExitKomsel')

let login = require('../helpers/login')

const getKomsels = (req, res) => {
  Komsel.find((err, komsels) => {
    res.send(err? {err:err}: komsels)
  })
}

const getKomsel = (req, res) => {
  let id = req.params.id

  Komsel.findById(id, (err, komsel) => {
    res.send(err? {err:err}: komsel)
  })
}

const addKomsel = (req, res) => {
  let email = req.body.email
  // let decoded = login.getUserDetail(req.headers.token)
  // let user = decoded._id || ''
  User.findOne({email: email}, (err,user)=>{
    let komsel = {
      name: req.body.name || '',
      username: req.body.username || '',
      location: {
        lng: req.body.lng || '',
        lat: req.body.lat || '',
        city: req.body.city || '',
      },
      _creator: user._id,
      _leader: user._id,
      _church: req.body.church || ''
    }
    let n_komsel = new Komsel(komsel)

    n_komsel.save((err, n_komsel) => {
      if (err) {
        let err_msg = []
        for (let error in err.errors) err_msg.push(err.errors[error].message)
        res.send({err : err_msg.join(',')})
      } else {
        res.send(n_komsel)
      }
    })
  })

}

const deleteKomsel = (req, res) => {
  let id = req.params.id

  Komsel.findById(id, (err, komsel) => {
    if(err) res.send({err: 'Invalid Komsel'})
    else komsel.remove((err,deleted) => {res.send(err? {err:err} : deleted)})
  })
}

const editKomsel = (req, res) => {
  let id = req.params.id

  Komsel.findById(id, (err, komsel) => {
    if (err) res.send({err: 'Invalid Komsel'})
    else {
      let location = komsel.location || {}
      if (typeof req.body.name !== 'undefined') komsel.name = req.body.name
      if (typeof req.body.theme !== 'undefined') komsel.theme = req.body.theme
      if (typeof req.body.lng !== 'undefined') location.lng = req.body.lng
      if (typeof req.body.lat !== 'undefined') location.lat = req.body.lat
      if (typeof req.body.city !== 'undefined') location.city = req.body.city
      if (typeof req.body.church !== 'undefined') komsel.church = req.body._church

      komsel.save((err, komsel) => {
        res.send(err? {err:err} : komsel)
      })
    }
  })
}
//if admin
const approveKomsel = (req, res) => {
  let id = req.params.id
  // let decoded = login.getUserDetail(req.headers.token)

  // Staff.findById(decoded._id, (err, staff) => {
    // if (err) res.send({err: 'You dont have access'})
    // else {
      Komsel.findById(id, (err, komsel) => {
        if (err) res.send({err:'Invalid Komsel'})
        else if (komsel != null){
          komsel.isApproved = true
          komsel.approvedBy = decoded._id
          komsel.save((err, approved_komsel) => {
            res.send(err? {err: err} : approved_komsel)
          })
        } else res.send({err: 'Invalid Komsel'})
      })
    // }
  // })
}

const editLeader = (req, res) => {
  // // let decoded = login.getUserDetail(req.headers.token)
  // // let user = decoded._id || ''
  //
  // // if (typeof req.body.leader === 'undefined') res.send({err:'Please choose the next leader'})
  // // else {
  //   // Komsel.findOne({_leader:user}, (err, komsel) => {
  //   //   if (err) res.send({err: 'You dont have access to change the leader'})
  //   //   else {
  //       komsel._leader = req.body.leader
  //       komsel.save((err, n_leader_komsel) => {
  //         res.send(err? {err: err} : n_leader_komsel)
  //       })
  //   //   }
  //   // })
  // // }
}

const editPopularity = (req, res) => {}

//sekalian update badge
const editPoin = (req, res) => {}
const addPlayHistory = (req, res) => {}

const addMember = (req, res) => {
  let id = req.params.idRequest

  RequestJoinKomsel.findById(id, (err, joinreq)=> {
    if (err) res.send({err:'Invalid request'})
    else {
      Komsel.findById(joinreq._komsel, (err, komsel) => {
        if (err) res.send({err: 'Komsel not exist'})
        else if (komsel === null) res.send({err: 'Komsel not exist'})
        else {
          if (typeof komsel.member === 'undefined') komsel.member = []

          let newMember =  {
            _member: joinreq._requestor,
            role: 'member'
          }

          komsel.member.push(newMember)
          komsel.save((err, n_komsel) => {
            if (err) res.send({err:err})
            else {
              // console.log(joinreq._requestor)
              User.findById(joinreq._requestor, (err, user)=> {
                if (err) res.send({err:err})
                else if(user === null) res.send({err: 'Invalid user'})
                else {
                  if (typeof user.komsel === 'undefined') user.komsel = []
                  user.komsel.push({
                    _komsel: joinreq._komsel,
                    role: 'member'
                  })
                  user.save((err, user) =>{
                    joinreq.remove((err, deleted) => {
                      res.send(err? {err:err} : deleted)
                    })
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}

const addAchievement = (req, res) => {}

const deleteMember = (req, res) => {
  let id = req.params.idRequest

  RequestExitKomsel.findById(id, (err, leavereq)=> {
    if (err) res.send({err:'Invalid request'})
    else if(leavereq === null) res.send({err:'Invalid Leave Request'})
    else {
      Komsel.findById(leavereq._komsel, (err, komsel) => {
        if (err) res.send({err: 'Komsel not exist'})
        else {
          if (typeof komsel.member === 'undefined') komsel.member = []
          // console.log(komsel.member[0])
          // let idx = komsel.member.findIndex( m =>  `${m._member}` == `${leavereq._requestor}`)

          // console.log(idx)

          komsel.member = komsel.member.filter( m =>  `${m._member}` !== `${leavereq._requestor}`)
          komsel.save((err, n_komsel) => {
            if (err) res.send({err:err})
            else {
              User.findById(leavereq._requestor, (err, user)=> {
                if (err) res.send({err:err})
                else {
                  if (typeof user.komsel === 'undefined') user.komsel = []

                  user.komsel = user.komsel.filter(k => `${k._komsel}` != `${leavereq._komsel}`)
                  user.save((err, user) => {
                    leavereq.remove((err, deleted) => {
                      res.send(err? {err:err} : deleted)
                    })
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}

module.exports = {
  getKomsels,
  getKomsel,
  addKomsel,
  deleteKomsel,
  editKomsel,
  approveKomsel,
  editLeader,
  editPopularity,
  editPoin,
  addPlayHistory,
  addAchievement,
  addMember,
  deleteMember
}