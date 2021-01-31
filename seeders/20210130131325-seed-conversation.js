'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const conv = [
      {
        name: 'A-B',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'A-C',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Conversations', conv)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Conversations')
  }
};
