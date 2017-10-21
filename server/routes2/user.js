'use strict'
const express = require('express');
let router = express.Router();
const userCtrl = require('../controllers/userCtrl');

router.get('/', userCtrl.getUsers) //v
router.get('/:id', userCtrl.getUser) //v
router.get('/komsel/:id', userCtrl.getUserKomsel) //
router.delete('/:id', userCtrl.deleteUser) //v
router.put('/:id', userCtrl.editUser) //

module.exports = router;