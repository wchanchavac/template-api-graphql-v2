const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const organizationId2 = uuidv4();
    const organizationId3 = uuidv4();
    const organizationId4 = uuidv4();
    const organizationId5 = uuidv4();

    const organizations = [
      {
        id: organizationId,
        name: 'Guatemala',
        image: 'https://flagsapi.com/GT/flat/64.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: organizationId2,
        name: 'El Salvador',
        image: 'https://flagsapi.com/SV/flat/64.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: organizationId3,
        name: 'Honduras',
        image: 'https://flagsapi.com/HN/flat/64.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: organizationId4,
        name: 'Costa Rica',
        image: 'https://flagsapi.com/CR/flat/64.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: organizationId5,
        name: 'Nicaragua',
        image: 'https://flagsapi.com/NI/flat/64.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('organization', organizations, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('organization', null, {});
  },
};
