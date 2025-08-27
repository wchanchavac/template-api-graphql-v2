const { v4: uuidv4 } = require('uuid');
// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

    const currencies = [
      {
        id: uuidv4(),
        name: 'QUETZAL',
        organizationId: organizationId, // Replace with a valid organizationId
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'DOLAR',
        organizationId: organizationId, // Replace with a valid organizationId
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('currency', currencies, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('currency', null, {});
  },
};
