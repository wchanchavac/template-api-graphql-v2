const { v4: uuidv4 } = require('uuid');
// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { hashPassword } = await import('../../auth/password.js');

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);

    const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

    const users = [
      {
        id: uuidv4(),
        name: 'Gerente Claro',
        email: 'gerente@claro.com',
        password: await hashPassword('password'),
        organizationId: organizationId, // Replace with a valid organizationId
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Analista Claro',
        email: 'analista@claro.com',
        password: await hashPassword('password'),
        organizationId: organizationId, // Replace with a valid organizationId
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('user', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  },
};
