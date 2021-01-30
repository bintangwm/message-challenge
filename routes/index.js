const router = require('express').Router()
const userRouter = require('./users')
const messageRouter = require('./message')
const conversationRouter = require('./conversation')
const participantRouter = require('./participant')

router.use('/user', userRouter)
router.use('/message', messageRouter)
router.use('/participant', participantRouter)
router.use('/conversation', conversationRouter)

module.exports = router