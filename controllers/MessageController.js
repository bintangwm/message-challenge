const { Message, User, Conversation, Participant } = require('../models')

class MessageController {
  static async getAllMessage (req, res, next) {
    const { conv_id } = req.query
    const options = {
      include: [{ model: Message, as: "reply" }],
      order: [['id', 'DESC']],
      where: {
        ...(conv_id) && { conv_id: [conv_id] }
      }
    }
    try {
      const messages = await Message.findAll(options)
      if (messages.length === 0) {
        throw { status: 404, msg: 'Conversation empty!' }
      }
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
        } else {
          // buat conv
          const users = await User.findAll({ where: { id: [user_id, to_user]}})
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
        }
      }
      message = await Message.create(payload)

      res.status(201).json({ message })
    } catch (err) {
      next(err)
    }
  }

  static async replyMessage(req, res, next) {
    // ambil id message yang mau di reply reply/:id
    // cari message-nya ada atau ngga --> dapet conv_id
    // cek apakah user tergabung dalam conv_id
    const reply_msg_id = +req.params.id
    const { user_id, content } = req.body
    let conv_found = false
    let message
    try {
      const user = await User.findByPk(user_id, { include: { model: Participant } })
      const reply_msg_to = await Message.findByPk(reply_msg_id)
      const { conv_id } = reply_msg_to
      if (!user) {
        throw { status: 404, msg: 'user not found!' }
      } else if (!reply_msg_to) {
        throw { status: 404, msg: 'msg not found!' }
      } else {
        user.Participants.forEach(el => {
          if (el.conv_id === conv_id) {
            conv_found = true
          }
        });
        console.log(conv_id + '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< ini dia');
        console.log(conv_found);
        if (!conv_found) {
          throw { status: 404, msg: 'not allowed to reply!' }
        } else {
          const payload = {
            user_id, content, conv_id, reply_msg_id
          }
          message = await Message.create(payload)
        }
      }
      res.status(201).json({ message })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = MessageController