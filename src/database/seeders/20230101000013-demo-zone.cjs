const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const names = [
      ['c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb', 'CHIMALTENANGO'],
      ['c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb', 'ESCUINTLA'],
      ['c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb', 'GUATEMALA'],
      ['c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb', 'JALAPA'],
      ['c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb', 'JUTIAPA'],
      ['c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb', 'SACATEPEQUEZ'],
      ['c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb', 'SANTA ROSA'],
      ['2f288888-85d6-42e8-bc6c-46c9ef600e08', 'EL PROGRESO'],
      ['2f288888-85d6-42e8-bc6c-46c9ef600e08', 'GUATEMALA'],
      ['4d393ef2-7246-4183-bbea-1b1b87f1785b', 'BAJA VERAPAZ'],
      ['4d393ef2-7246-4183-bbea-1b1b87f1785b', 'EL PROGRESO'],
      ['4d393ef2-7246-4183-bbea-1b1b87f1785b', 'EL QUICHE'],
      ['4d393ef2-7246-4183-bbea-1b1b87f1785b', 'ESCUINTLA'],
      ['4d393ef2-7246-4183-bbea-1b1b87f1785b', 'GUATEMALA'],
      ['4d393ef2-7246-4183-bbea-1b1b87f1785b', 'SANTA ROSA'],
      ['c894deeb-fa74-4336-a4eb-3d299c0c2b5b', 'BAJA VERAPAZ'],
      ['c894deeb-fa74-4336-a4eb-3d299c0c2b5b', 'CHIMALTENANGO'],
      ['c894deeb-fa74-4336-a4eb-3d299c0c2b5b', 'EL QUICHE'],
      ['c894deeb-fa74-4336-a4eb-3d299c0c2b5b', 'ESCUINTLA'],
      ['c894deeb-fa74-4336-a4eb-3d299c0c2b5b', 'HUEHUETENANGO'],
    ];

    const zones = names.map(([regionId, name]) => ({
      id: uuidv4(),
      regionId,
      name,
      organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('zone', zones, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('zone', null, {});
  },
};
