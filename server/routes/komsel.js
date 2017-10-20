'use strict'
const express = require('express')
let router = express.Router()
const komselCtrl = require('../controllers/komselCtrl')

router.get('/', komselCtrl.getKomsels) //
router.get('/:id', komselCtrl.getKomsel) //
router.post('/', komselCtrl.addKomsel) //
router.delete('/:id', komselCtrl.deleteKomsel) //
router.put('/:id', komselCtrl.editKomsel) //
router.put('/approval/:id', komselCtrl.approveKomsel) //
router.put('/leader/:id', komselCtrl.editLeader) //
router.put('/popularity/:id', komselCtrl.editPopularity) //
router.put('/badge/:id', komselCtrl.editBadge) //
router.put('/poin/:id', komselCtrl.editPoin) //
router.post('/play/:id', komselCtrl.addPlayHistory) //
router.post('/achievement/:id', komselCtrl.addAchievement) //
router.post('/member/:id', komselCtrl.addMember) //
router.delete('/member/:id', komselCtrl.deleteMember) //

module.exports = router