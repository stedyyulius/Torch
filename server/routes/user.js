'use strict'
const express = require('express')
let router = express.Router()
const userCtrl = require('../controllers/userCtrl')

router.get('/', userCtrl.getUsers) //
router.get('/:id', userCtrl.getUser) //
router.post('/', userCtrl.addUser) //
router.delete('/:id', userCtrl.deleteUser) //
router.put('/:id', userCtrl.editUser) //
router.put('/poin/:id', komselCtrl.editPoin) //
router.put('/komsel/:id', komselCtrl.editKomsel) //


module.exports = router