const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.get('/', UserController.getAllUser)
router.post('/', UserController.createUser)

module.exports = router