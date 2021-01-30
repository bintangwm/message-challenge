const { User, Conversation } = require('../models')

class ConversationController {
  static async getAllConversation (req, res) {
    try {
      const conversations = await Conversation.findAll()
      res.status(200).json(conversations)
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ConversationController