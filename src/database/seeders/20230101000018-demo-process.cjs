const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    const processId = '5dad4da5-a13b-4283-9754-c0d911379f68';
    const processId2 = 'b053c9ae-58ba-4848-8582-3c162eb54b42';
    const processId3 = 'af194a73-f581-4b04-8802-b0c1aeea332b';

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
