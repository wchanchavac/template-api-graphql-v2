const { v4: uuidv4 } = require('uuid');
// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { hashPassword } = await import('../../auth/password.js');

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);

    const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

    const data = [
      ['a338039e-82cc-4d7b-a909-4b86b1184315', 'MANTENIMIENTO PREVENTIVO', ''],
      [
        '40b8f823-c330-4c50-adeb-814d744187a1',
        'AIRE ACONDICIONADO',
        'AIRE ACONDICIONADO',
      ],
      ['aaf6ed46-bfe7-46cf-a987-d8f43c92f677', 'ELECTROGENO', 'ELECTROGENO'],
      ['2d86e91e-65ec-495e-9da4-5c46a2dde411', 'ENERGIA', 'ENERGIA'],
      ['4ad7037d-d4fa-4e59-b64b-7da6a801c86f', 'LOGISTICA', 'LOGISTICA'],
      ['2483b581-1138-43a4-92fe-fd8f9762fcdf', 'OBRA CIVIL', 'OBRA CIVIL'],
      [
        'f4e51116-4f16-4b73-9f07-a68c74fe6a6c',
        'PUESTA A TIERRA',
        'PUESTA A TIERRA',
      ],
      ['c4d51de8-31bf-4787-886e-149c5de8ff69', 'VANDALISMO', 'VANDALISMO'],
      [
        '3810fe9e-74ff-4c2c-934f-e67fc76be2ad',
        'GENERICO',
        'GENERICO CORRECTIVO',
      ],
      [
        'e0358f00-6515-45df-be84-660d869cc4bc',
        'GENERICO',
        'GENERICO ABASTECIMIENTO',
      ],
    ];

    const serviceTypes = data.map(([id, name, description]) => ({
      id,
      name,
      description,
      organizationId,
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('serviceType', serviceTypes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('serviceType', null, {});
  },
};
