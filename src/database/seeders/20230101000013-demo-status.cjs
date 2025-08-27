const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const names = [
      ['AUTORIZADO'],
      ['CANCELADO'],
      ['CANCELADO POR CANTIDADES'],
      ['CANCELADO POR MODULO'],
      ['COTIZADO'],
      ['EN PROCESO'],
      ['INICIO'],
      ['NO EJECUTADO'],
      ['PENDIENTE'],
      ['REALIZADO'],
      ['VALIDADO'],
    ];

    const statuses = names.map(([name]) => ({
      id: uuidv4(),
      name,
      organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('status', statuses, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('status', null, {});
  },
};
