'use strict'
const express = require('express')
let router = express.Router()
const requestCtrl = require('../controllers/requestCtrl')

router.get('/komsel/join', requestCtrl.getJoinKomsel) //x
router.get('/komsel/leave', requestCtrl.getExitKomsel) //x
router.get('/komsel/create', requestCtrl.getCreateKomsel) //x
router.post('/komsel/join/:id', requestCtrl.addJoinKomsel) //x
router.post('/komsel/leave/:id', requestCtrl.addExitKomsel) //x

module.exports = router