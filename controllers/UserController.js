
class UserController {
  static getAllUser (req, res) {
    res.status(200).json('user list')
  }
}

module.exports = UserController