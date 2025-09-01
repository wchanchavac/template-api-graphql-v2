// const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const names = [
      [
        'a5983f30-76a7-4ec2-a29e-ccda41b69984',
        'c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb',
        'CHIMALTENANGO',
      ],
      [
        '4c209ed6-0365-4fde-bb01-21eddafca475',
        'c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb',
        'ESCUINTLA',
      ],
      [
        '4d139d8b-592b-4e20-ba94-dd8478e6c1fb',
        'c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb',
        'GUATEMALA',
      ],
      [
        'a76571b5-723c-407c-b064-86de744d3a4a',
        'c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb',
        'JALAPA',
      ],
      [
        '635676fb-6816-474f-890d-d6c4217f55e7',
        'c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb',
        'JUTIAPA',
      ],
      [
        'db12e58e-1b47-499b-99d7-aee0fc457317',
        'c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb',
        'SACATEPEQUEZ',
      ],
      [
        '97b5ca5b-1e7a-48aa-9967-627506262226',
        'c9b013d9-8a74-4ed9-a4b9-1069e4ed5efb',
        'SANTA ROSA',
      ],
      [
        'd345cfad-ea7a-4cbc-8c80-4ccc319f5c17',
        '2f288888-85d6-42e8-bc6c-46c9ef600e08',
        'EL PROGRESO',
      ],
      [
        '4ef5a035-a198-4f5c-a9ad-01cbb0eb563b',
        '2f288888-85d6-42e8-bc6c-46c9ef600e08',
        'GUATEMALA',
      ],
      [
        '44f66b91-1283-4e52-a0fd-774f7712c197',
        '4d393ef2-7246-4183-bbea-1b1b87f1785b',
        'BAJA VERAPAZ',
      ],
      [
        '1a3a0d3b-5cd6-4fda-b2f3-23eefb998cdf',
        '4d393ef2-7246-4183-bbea-1b1b87f1785b',
        'EL PROGRESO',
      ],
      [
        'f2940c66-d410-486d-8039-859d577816f9',
        '4d393ef2-7246-4183-bbea-1b1b87f1785b',
        'EL QUICHE',
      ],
      [
        'fc815e26-7a69-4ae9-b2d3-2ef419be6f5d',
        '4d393ef2-7246-4183-bbea-1b1b87f1785b',
        'ESCUINTLA',
      ],
      [
        '9c0e0f1b-65f7-4a28-80bd-07db436257f9',
        '4d393ef2-7246-4183-bbea-1b1b87f1785b',
        'GUATEMALA',
      ],
      [
        '9c10afac-538b-452c-9142-5b22d78c4b81',
        '4d393ef2-7246-4183-bbea-1b1b87f1785b',
        'SANTA ROSA',
      ],
      [
        'cb9f6282-948b-4de9-a99b-1caa9ad6e76b',
        'c894deeb-fa74-4336-a4eb-3d299c0c2b5b',
        'BAJA VERAPAZ',
      ],
      [
        '5174b115-bb5f-46fb-b22a-f778e8773d1c',
        'c894deeb-fa74-4336-a4eb-3d299c0c2b5b',
        'CHIMALTENANGO',
      ],
      [
        '403c3f51-c01b-4ae6-b1ad-3df5a6425687',
        'c894deeb-fa74-4336-a4eb-3d299c0c2b5b',
        'EL QUICHE',
      ],
      [
        '10d233a3-352a-407e-900c-cfa933d851e9',
        'c894deeb-fa74-4336-a4eb-3d299c0c2b5b',
        'ESCUINTLA',
      ],
      [
        'ff3d1323-3e8d-4fe6-9224-d483509f815d',
        'c894deeb-fa74-4336-a4eb-3d299c0c2b5b',
        'HUEHUETENANGO',
      ],
    ];

    const zones = names.map(([id, regionId, name]) => ({
      id,
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
