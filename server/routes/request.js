'use strict'
const express = require('express')
let router = express.Router()
const requestCtrl = require('../controllers/requestCtrl')

router.get('/komsel/join', requestCtrl.getJoinKomsel) //
router.delete('/komsel/leave', requestCtrl.getExitKomsel) //
router.get('/komsel/create', requestCtrl.getCreateKomsel) //
router.post('/komsel/join/:id', requestCtrl.addJoinKomsel) //
router.post('/komsel/leave/:id', requestCtrl.addExitKomsel) //
router.post('/komsel/create/:id', requestCtrl.addCreateKomsel) //

module.exports = router