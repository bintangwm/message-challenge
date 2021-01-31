const { User } = require('../models')

class UserController {
  static async getAllUser (req, res, next) {
    try {
      const user = await User.findAll()
      res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  }
  
  static async createUser (req, res, next) {
    const { username } = req.body
    try {
      const user = await User.create({ username })
      res.status(201).json(user)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController