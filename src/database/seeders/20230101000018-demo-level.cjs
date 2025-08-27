const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    const levelId = uuidv4();
    const levelId2 = uuidv4();
    const levelId3 = uuidv4();

    const levels = [
      {
        id: levelId,
        name: 'Escalación Nivel Uno',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: levelId2,
        name: 'Escalación Nivel Dos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: levelId3,
        name: 'Escalación Nivel Tres',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('level', levels, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('level', null, {});
  },
};
