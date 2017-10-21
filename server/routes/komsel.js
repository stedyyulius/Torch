'use strict'
const express = require('express')
let router = express.Router()
const komselCtrl = require('../controllers/komselCtrl')

router.get('/', komselCtrl.getKomsels) // x
router.get('/:id', komselCtrl.getKomsel) // x
router.post('/', komselCtrl.addKomsel) // x
router.delete('/:id', komselCtrl.deleteKomsel) //x
router.put('/:id', komselCtrl.editKomsel) //
router.put('/approval/:id', komselCtrl.approveKomsel) //x
router.put('/leader/:id', komselCtrl.editLeader) //x
router.put('/popularity/:id', komselCtrl.editPopularity) //
// router.put('/badge/:id', komselCtrl.editBadge) //
router.put('/poin/:id', komselCtrl.editPoin) //
router.post('/play/:id', komselCtrl.addPlayHistory) //
router.post('/achievement/:id', komselCtrl.addAchievement) //
router.post('/member/:id', komselCtrl.addMember) //
router.delete('/member/:id', komselCtrl.deleteMember) //

module.exports = router