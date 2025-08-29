const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const organizationId2 = '48627d27-be69-47c2-817c-b56da3203359';
    const organizationId3 = '6170f411-37a9-4bbc-b813-c2a7de593079';
    const organizationId4 = 'de537c10-0898-40ea-a50e-61f570509eaf';
    const organizationId5 = 'f45ac8c1-5ad6-4e02-96de-d3d8e4ca6330';

    const organizations = [
      {
        id: organizationId,
        name: 'Guatemala',
        image: 'https://flagcdn.com/gt.svg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: organizationId2,
        name: 'El Salvador',
        image: 'https://flagcdn.com/sv.svg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: organizationId3,
        name: 'Honduras',
        image: 'https://flagcdn.com/hn.svg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: organizationId4,
        name: 'Costa Rica',
        image: 'https://flagcdn.com/cr.svg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: organizationId5,
        name: 'Nicaragua',
        image: 'https://flagcdn.com/ni.svg',
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
