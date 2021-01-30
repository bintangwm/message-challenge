'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const participant = [
      {
        user_id: 1,
        conv_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        conv_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Participants', participant)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Participants')
  }
};
