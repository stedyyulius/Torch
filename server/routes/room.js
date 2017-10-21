'use strict'
const express = require('express')
let router = express.Router()
const roomCtrl = require('../controllers/roomCtrl')

router.get('/', roomCtrl.getRooms) //
router.post('/', roomCtrl.addRoom) //
router.delete('/:id', roomCtrl.deleteRoom) //
router.put('/:id', roomCtrl.editRoom) //
router.get('/search', roomCtrl.searchRoom) // online, offline ()
router.get('/open', roomCtrl.getOpenRoom) //
router.put('/:id', roomCtrl.editStatusPlayer) //
router.post('/:id', roomCtrl.addPlayer) //

module.exports = router