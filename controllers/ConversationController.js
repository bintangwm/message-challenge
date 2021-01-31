const { User, Conversation, Participant, Message } = require('../models')
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

class ConversationController {
  static async getAllConversation (req, res, next) {
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
      next(err)
    }
  }

  static async getConvById (req, res, next) {
    const conv_id = +req.params.id
    const options = {
      include: [
        {
          model: Message,
          required: true
        },
        {
          model: Participant,
          required: true
        }
      ]
    }
    try {
      const conversations = await Conversation.findByPk(conv_id ,options)
      if (!conversations) {
        throw { status: 404, msg: 'conversation not found!' }
      }
      res.status(200).json(conversations)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = ConversationController