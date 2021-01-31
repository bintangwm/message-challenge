const { User, Conversation, Participant } = require('../models')
const Sequelize = require('sequelize');
const user = require('../models/user');
const Op = Sequelize.Op;

class ConversationController {
  static async getAllConversation (req, res) {
    const { user_id } = req.body
    const options = {
      include: [
        {
          model: Participant, 
          where: { 
            // user_id: {
            //   [Op.and] : [1, 2]
            // },
            // user_id: [1, 2]
            // user_id: { [Op.and]: [1, 2] }
            // user_id: { [Op.in] : [1, 2] }
            ...(user_id) && { user_id: [user_id] }
          }
        }
      ],
      order: [['id', 'DESC']]
    }
    try {
      const conversations = await Conversation.findAll(options)
      res.status(200).json(conversations)
    } catch (err) {
      console.log(err);
    }
  }

  static async getConvById (req, res) {
    const conv_id = +req.params.id
    const options = {
      include: [
        {
          model: Participant
        }
      ]
    }
    try {
      const conversations = await Conversation.findByPk(conv_id ,options)
      res.status(200).json(conversations)
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ConversationController