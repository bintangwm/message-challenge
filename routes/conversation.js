const router = require('express').Router()
const ConversationController = require('../controllers/ConversationController')

router.get('/', ConversationController.getAllConversation)
router.get('/:id', ConversationController.getConvById)

module.exports = router