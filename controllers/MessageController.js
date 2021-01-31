const { Message, User, Conversation, Participant } = require('../models')

class MessageController {
  static async getAllMessage (req, res, next) {
    const options = {
      include: [{ model: Message, as: "reply" }],
      order: [['id', 'DESC']]
    }
    try {
      const messages = await Message.findAll(options)
      res.status(200).json({ messages })
    } catch (err) {
      next(err)
    }
  }

  // buat pesan
  // cari dulu apakah ada conv? pakai user_id dan to_user
  // 
  static async createMessage (req, res, next) {
    let { user_id, conv_id, content, to_user, reply_to } = req.body
    let payload = {
      user_id, content
    }
    let message
    let conv
    try {
      if (user_id == to_user) {
        throw { status: 400, msg: "cannot send message to yourself" }
      } else if (conv_id) {
        conv = await Participant.findOne({ where: { conv_id, user_id }})
        if (!conv) {
          throw { status: 400, msg: 'conversation not found' }
        } else {
          payload.conv_id = conv_id
          if (reply_to) {
            payload.reply_msg_id = reply_to
            console.log('reply');
            message = await Message.create(payload)
          } else {
            message = await Message.create(payload)
          }
        }
      } else {
        const convOptions = {
          include: [
            {
              model: Participant, 
              where: { 
                user_id: [user_id, to_user]
              }
            }
          ]
        }
        conv = await Conversation.findAll(convOptions)
        conv.forEach(el => {
          if (el.Participants.length === 2) {
            conv_id = el.id
          }
        });
        if (conv_id) {
          payload.conv_id = conv_id
          if (reply_to) {
            payload.reply_msg_id = reply_to
            console.log('reply');
            message = await Message.create(payload)
          } else {
            message = await Message.create(payload)
          }
        } else {
          // buat conv
          const users = await User.findAll({ where: { id: [user_id, to_user]}})
          // conv = users
          const convPayload = {
            name: users[0].username + '-' + users[1].username
          }
          conv = await Conversation.create(convPayload)
          conv_id = conv.id
          // buat participant
          let participantPayload = []
          users.forEach(user => {
            participantPayload.push({
              conv_id,
              user_id: user.id
            })
          });
          await Participant.bulkCreate(participantPayload)
          // buat message
          payload.conv_id = conv_id
          message = await Message.create(payload)
        }
        res.status(201).json({ message })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = MessageController