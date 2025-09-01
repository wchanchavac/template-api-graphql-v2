const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      ['4f49b243-0fc9-4528-b10e-72e4321aed99', 'COTIZACIÓN'],
      ['54a8de61-dea3-4ddf-835b-b4f215e9f92b', 'ENVIADO A PROVEEDOR'],
      ['55142dd7-c16c-49fb-899e-a085e56a5ac5', 'EN PROCESO'],
      ['2b6d08e5-ff16-41e1-918c-1844b4a2cf03', 'APROBACIÓN POR PROVEEDOR'],
      ['7b7b675f-a939-48d9-ad0f-afaae9bd744c', 'VALIDACIÓN POR ANALISTA'],
      ['446c4964-86bf-4fd1-a689-a497015982a7', 'FINALIZADO'],
      ['ae76a53d-3f1f-4e7b-994a-07bc6da70bff', 'PENALIZADO'],
    ];
    const stages = data.map(([id, name]) => ({
      id,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('stage', stages, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('stage', null, {});
  },
};
