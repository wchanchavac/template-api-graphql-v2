module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    const allPermissions = JSON.stringify([
      'userType.read',

      'currency.read',
      'currency.create',
      'currency.update',
      'currency.delete',

      'user.me',
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

      'attachment.read',
      'attachment.upload',
      'attachment.download',
      'attachment.delete',

      'userType.read',
      'userType.create',
      'userType.update',
      'userType.delete',
    ]);

    const readPermissions = JSON.stringify([
      'user.me',
      'userType.read',
      'currency.read',
      'user.read',
      'region.read',
      'area.read',
      'concept.read',
      'comment.read',
      'state.read',
      'zone.read',
      'status.read',
      'vendor.read',
      'technology.read',
      'subzone.read',
      'supportTicket.read',
      'stage.read',
      'speciality.read',
      'organization.read',
      'site.read',
      'serviceType.read',
      'service.read',
      'region.read',
      'process.read',
      'price.read',
      'measurementUnit.read',
      'quote.read',
      'fuelQuote.read',
      'user.read',
      'userType.read',
      'attachment.read',
    ]);

    const claroPermissions = JSON.stringify([
      'user.me',
      'process.read',
      'site.read',
      'vendor.read',
      'supportTicket.read',
      'supportTicket.create',
      'supportTicket.update',
      'quote.read',
      'quote.create',
      'quote.update',
      'quote.delete',
      'fuelQuote.read',
      'fuelQuote.update',
      'comment.read',
      'attachment.read',
      'serviceType.read',
      'concept.read',
      'service.read',
      'price.read',
      'measurementUnit.read',
      'user.read',
    ]);

    const vendorPermissions = JSON.stringify([
      'user.me',
      'supportTicket.read',
      'supportTicket.update',
      'quote.read',
      'quote.update',
      'fuelQuote.read',
      'fuelQuote.update',
      'comment.read',
      'comment.create',
      'comment.update',
      'comment.delete',
      'attachment.read',
      'attachment.upload',
      'attachment.download',
      'attachment.delete',
      'process.read',
      // 'user.read',
    ]);

    const stages = JSON.stringify([
      null, // 'UNKNOWN STAGE'
      '4f49b243-0fc9-4528-b10e-72e4321aed99', // 'COTIZACIÓN'
      '54a8de61-dea3-4ddf-835b-b4f215e9f92b', // 'ENVIADO A PROVEEDOR'
      '55142dd7-c16c-49fb-899e-a085e56a5ac5', // 'EN PROCESO'
      '2b6d08e5-ff16-41e1-918c-1844b4a2cf03', // 'APROBACIÓN POR PROVEEDOR'
      '7b7b675f-a939-48d9-ad0f-afaae9bd744c', // 'VALIDACIÓN POR ANALISTA'
      '446c4964-86bf-4fd1-a689-a497015982a7', // 'FINALIZADO'
      'ae76a53d-3f1f-4e7b-994a-07bc6da70bff', // 'PENALIZADO'
    ]);

    const claroStages = JSON.stringify([
      null, // 'UNKNOWN STAGE'
      '4f49b243-0fc9-4528-b10e-72e4321aed99', // 'COTIZACIÓN'
      '7b7b675f-a939-48d9-ad0f-afaae9bd744c', // 'VALIDACIÓN POR ANALISTA'
    ]);

    const vendorStages = JSON.stringify([
      '54a8de61-dea3-4ddf-835b-b4f215e9f92b', // 'ENVIADO A PROVEEDOR'
      '55142dd7-c16c-49fb-899e-a085e56a5ac5', // 'EN PROCESO'
      '2b6d08e5-ff16-41e1-918c-1844b4a2cf03', // 'APROBACIÓN POR PROVEEDOR'
    ]);

    const data = [
      [
        'acbe289b-656d-4036-b010-ef2ce540ab00',
        'Super Administrador',
        7,
        allPermissions,
        stages,
      ],
      [
        'a2c9d673-ec8a-4ab9-9778-7fbf8b96228c',
        'Administrador',
        6,
        allPermissions,
        stages,
      ],
      [
        '5465a359-8598-42c0-b1c5-ab13a0a36976',
        'Auditor',
        5,
        readPermissions,
        stages,
      ],
      [
        '05025400-bde3-410d-9a02-01e495369706',
        'Gerente',
        4,
        claroPermissions,
        claroStages,
      ],
      [
        '868fda97-e6e4-4d77-9a6d-48ab50aad7e7',
        'Analista',
        3,
        claroPermissions,
        claroStages,
      ],
      [
        '0ca93b7c-b92a-46ca-9cec-4c6363817fd6',
        'Proveedor',
        2,
        vendorPermissions,
        vendorStages,
      ],
    ];

    const userTypes = data.map(([id, name, level, permissions, stages]) => ({
      id,
      name,
      level,
      createdAt: new Date(),
      updatedAt: new Date(),
      permissions,
      stages,
    }));

    await queryInterface.bulkInsert('userType', userTypes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userType', null, {});
  },
};
