const router = require('express').Router()
const userRouter = require('./users')
const messageRouter = require('./message')
const conversationRouter = require('./conversation')
const participantRouter = require('./participant')
const MessageController = require('../controllers/MessageController')

router.use('/user', userRouter)
router.use('/message', messageRouter)
router.post('/reply/:id', MessageController.replyMessage)
router.use('/participant', participantRouter)
router.use('/conversation', conversationRouter)

module.exports = router