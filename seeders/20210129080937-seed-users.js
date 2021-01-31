'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        username: 'A',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'B',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'C',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'D',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Users', users)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users')
  }
};
