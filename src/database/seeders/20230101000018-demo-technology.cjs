const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);

    const names = [
      '2G',
      '3G',
      'CENTRAL MATRIZ',
      'CID',
      'EXPANSION 1',
      'EXPANSION 2',
      'EXPANSION 3',
      'MUX',
      'REPETIDORA',
      'SHELTER',
      'UNIDAD REMOTA',
    ];

    const technologies = names.map((name) => ({
      id: uuidv4(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('technology', technologies, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('technology', null, {});
  },
};
