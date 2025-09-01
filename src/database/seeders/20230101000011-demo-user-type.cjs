module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    const data = [
      ['acbe289b-656d-4036-b010-ef2ce540ab00', 'Super Administrador', 7],
      ['a2c9d673-ec8a-4ab9-9778-7fbf8b96228c', 'Administrador', 6],
      ['5465a359-8598-42c0-b1c5-ab13a0a36976', 'Auditor', 5],
      ['05025400-bde3-410d-9a02-01e495369706', 'Gerente', 4],
      ['868fda97-e6e4-4d77-9a6d-48ab50aad7e7', 'Analista', 3],
      ['0ca93b7c-b92a-46ca-9cec-4c6363817fd6', 'Proveedor', 2],
    ];

    const permissions = JSON.stringify([
      'userType.read',

      'currency.read',
      'currency.create',
      'currency.update',
      'currency.delete',

      'user.read',
      'user.create',
      'user.update',
      'user.delete',

      'region.read',
      'region.create',
      'region.update',
      'region.delete',

      'area.read',
      'area.create',
      'area.update',
      'area.delete',

      'concept.read',
      'concept.create',
      'concept.update',
      'concept.delete',

      'comment.read',
      'comment.create',
      'comment.update',
      'comment.delete',

      'state.read',
      'state.create',
      'state.update',
      'state.delete',

      'zone.read',
      'zone.create',
      'zone.update',
      'zone.delete',

      'status.read',

      'vendor.read',
      'vendor.create',
      'vendor.update',
      'vendor.delete',

      'technology.read',
      'technology.create',
      'technology.update',
      'technology.delete',

      'subzone.read',
      'subzone.create',
      'subzone.update',
      'subzone.delete',

      'supportTicket.read',
      'supportTicket.create',
      'supportTicket.update',
      'supportTicket.delete',

      'stage.read',

      'speciality.read',
      'speciality.create',
      'speciality.update',
      'speciality.delete',

      'organization.read',
      'organization.create',
      'organization.update',
      'organization.delete',

      'site.read',
      'site.create',
      'site.update',
      'site.delete',

      'serviceType.read',
      'serviceType.create',
      'serviceType.update',
      'serviceType.delete',

      'service.read',
      'service.create',
      'service.update',
      'service.delete',

      'region.read',
      'region.create',
      'region.update',
      'region.delete',

      'process.read',
      'process.create',
      'process.update',
      'process.delete',

      'price.read',
      'price.create',
      'price.update',
      'price.delete',

      'measurementUnit.read',
      'measurementUnit.create',
      'measurementUnit.update',
      'measurementUnit.delete',

      'quote.read',
      'quote.create',
      'quote.update',
      'quote.delete',

      'fuelQuote.read',
      'fuelQuote.update',

      'user.read',
      'user.create',
      'user.update',
      'user.delete',

      'userType.read',
      'userType.create',
      'userType.update',
      'userType.delete',
    ]);

    const userTypes = data.map(([id, name, level]) => ({
      id,
      name,
      level,
      createdAt: new Date(),
      updatedAt: new Date(),
      permissions,
    }));

    await queryInterface.bulkInsert('userType', userTypes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userType', null, {});
  },
};
