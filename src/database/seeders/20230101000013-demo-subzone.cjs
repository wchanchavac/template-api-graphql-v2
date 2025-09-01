const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const zoneId = 'a5983f30-76a7-4ec2-a29e-ccda41b69984',;
    const names = [
      ['CentroOccidente'],
      ['CentroOccidenteFija'],
      ['Escuintla'],
      ['Tecpan Guatemala'],
    ];

    const subzones = names.map(([name]) => ({
      id: uuidv4(),
      zoneId,
      name,
      organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('subzone', subzones, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subzone', null, {});
  },
};
