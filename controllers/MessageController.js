const { Message, User, Conversation, Participant } = require('../models')

class MessageController {
  static async getAllMessage (req, res) {
    const options = {
      include: [{ model: Message, as: "reply" }],
      order: [['id', 'DESC']]
    }
    try {
      const messages = await Message.findAll(options)
      res.status(200).json({ messages })
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  }

  // buat pesan
  // cari dulu apakah ada conv? pakai user_id dan to_user
  // 
  static async createMessage (req, res) {
    const { user_id, conv_id, content, to_user, reply_to } = req.body
    let payload = {
      user_id, content
    }
    let message
    try {
      if (conv_id) {
        const conv = await Participant.findOne({ where: { conv_id, user_id }})
        if (!conv) {
          res.status(404).json({ msg: 'conversation not found'})
        } else {
          payload.conv_id = conv_id
          if (reply_to) {
            payload.reply_msg_id = reply_to
            console.log('reply');
            message = await Message.create(payload)
            res.status(200).json({ message })
            
          } else {
            message = await Message.create(payload)
            res.status(200).json({ message })
          }
        }
      } else {

        res.status(200).json(req.body)
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  }
}

module.exports = MessageController