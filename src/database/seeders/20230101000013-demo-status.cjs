const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    // const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const names = [
      ['83ec8a98-618a-4c64-9985-f6e46bdaa6dc', 'AUTORIZADO'],
      ['f7b0f0d6-f044-41eb-9955-e3319de9f604', 'CANCELADO'],
      ['336219ff-f0bc-4dc8-889d-7e48c1c69b14', 'CANCELADO POR CANTIDADES'],
      ['22cfda7e-b8ad-4e6a-ba96-64c874d3c1cd', 'CANCELADO POR MODULO'],
      ['2bbf808c-c5b2-41cd-8b35-01d28ae68ef6', 'COTIZADO'],
      ['de010704-288e-4775-9413-a6f18f0cb01e', 'EN PROCESO'],
      ['c98f9265-df87-4b48-9c53-8203fbdd26a8', 'INICIO'],
      ['1e85678e-7b50-48e0-939f-4e05a753f93c', 'NO EJECUTADO'],
      ['f4b8eb39-196a-4c7b-a10c-ea2fb3183c08', 'PENDIENTE'],
      ['c8688def-fa17-419d-a463-5c5383987133', 'REALIZADO'],
      ['448b6ddc-db71-4a0b-9e9e-4b27f0565950', 'VALIDADO'],
    ];

    const statuses = names.map(([id, name]) => ({
      id,
      name,
      // organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('status', statuses, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('status', null, {});
  },
};
