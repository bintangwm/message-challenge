const router = require('express').Router()
const ConversationController = require('../controllers/ConversationController')

router.get('/', ConversationController.getAllConversation)

module.exports = router