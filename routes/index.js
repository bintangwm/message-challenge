const router = require('express').Router()
const userRouter = require('./users')

router.get('/user', userRouter)

module.exports = router