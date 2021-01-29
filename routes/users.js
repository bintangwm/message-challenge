const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.use('/', UserController.getAllUser)

module.exports = router