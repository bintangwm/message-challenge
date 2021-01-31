'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const messages = [
      {
        user_id: 1,
        conv_id: 1,
        content: 'Hai A',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        conv_id: 1,
        content: 'Hai juga B',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        conv_id: 2,
        content: 'Ini percakapan A-C',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Messages', messages)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Messages')
  }
};