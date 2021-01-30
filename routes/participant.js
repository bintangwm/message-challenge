const router = require('express').Router()
const ParticipantController = require('../controllers/ParticipantController')

router.get('/', ParticipantController.getAllParticipant)

module.exports = router