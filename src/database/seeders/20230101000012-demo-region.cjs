const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

    const names = [
      ['c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb', 'CENTRAL', 'CNT'],
      ['2f288888-85d6-42e8-bc6c-46c9ef600e08', 'METRO FIJA', 'MFJ'],
      ['4d393ef2-7246-4183-bbea-1b1b87f1785b', 'METRO MOVIL', 'MMV'],
      ['c894deeb-fa74-4336-a4eb-3d299c0c2b5b', 'OCCIDENTE', 'OCC'],
      ['5a1df1d2-57bf-4706-80a5-91fd5b9f4235', 'ORIENTE', 'ORN'],
    ];

    const regions = names.map(([id, name, abbreviation]) => ({
      id,
      name,
      abbreviation,
      organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('region', regions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('region', null, {});
  },
};
