const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    const processId = uuidv4();
    const processId2 = uuidv4();
    const processId3 = uuidv4();

    const processes = [
      {
        id: processId,
        name: 'Abastecimiento de combustible',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: processId2,
        name: 'Mantenimiento correctivo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: processId3,
        name: 'Mantenimiento preventivo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('process', processes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('process', null, {});
  },
};
