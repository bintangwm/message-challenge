const { User, Participant, Conversation } = require('../models')

class ParticipantController {
  static async getAllParticipant (req, res) {
    const options = {
      include: [{ model: Conversation }],
      order: [['id', 'DESC']]
    }
    try {
      const participants = await Participant.findAll(options)
      res.status(200).json(participants)
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ParticipantController