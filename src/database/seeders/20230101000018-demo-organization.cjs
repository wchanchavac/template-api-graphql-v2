const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const organizationId2 = uuidv4();

    const organizations = [
      {
        id: organizationId,
        name: 'Organization 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: organizationId2,
        name: 'Organization 2',
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
