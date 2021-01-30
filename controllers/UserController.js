const { User } = require('../models')

class UserController {
  static async getAllUser (req, res) {
    try {
      const user = await User.findAll()
      res.status(200).json(user)
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserController