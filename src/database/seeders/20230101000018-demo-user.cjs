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
        id: '6d8b5f7c-db7d-4613-8af4-b1c41c163929',
        name: 'Super Administrador',
        email: 'gerente@claro.com',
        password: await hashPassword('password'),
        userTypeId: 'acbe289b-656d-4036-b010-ef2ce540ab00',
        organizationId: organizationId, // Replace with a valid organizationId
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7d2cd811-1bf6-4118-b4fc-a3d138fd4ce7',
        name: 'Administrador',
        email: 'analista@claro.com',
        password: await hashPassword('password'),
        userTypeId: 'a2c9d673-ec8a-4ab9-9778-7fbf8b96228c',
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
