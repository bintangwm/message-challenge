const { User, Participant } = require('../models')

class ParticipantController {
  static async getAllParticipant (req, res) {
    try {
      const participants = await Participant.findAll()
      res.status(200).json(participants)
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ParticipantController