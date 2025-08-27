const { v4: uuidv4 } = require('uuid');
// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const serviceTypeId = 'a338039e-82cc-4d7b-a909-4b86b1184315';

    const data = [
      ['BABY SHELTER SIN AIRE ACONDICIONADO'],
      ['CELDA CON MG CONTINUO'],
      ['CELDA CON O SIN SHELTER CON MG CON O SIN A/C'],
      ['CENTRAL DEPARTAMENTAL 01'],
      ['CENTRAL DEPARTAMENTAL 02'],
      ['CENTRAL DEPARTAMENTAL 04'],
      ['CENTRAL DEPARTAMENTAL 05'],
      ['CENTRAL MATRIZ ESPECIAL 01'],
      ['CENTRAL MATRIZ METRO 01'],
      ['CENTRAL MATRIZ METRO 02'],
      ['CENTRAL MATRIZ METRO 03'],
      ['CENTRAL MATRIZ METRO 04'],
      ['CENTRAL MATRIZ METRO 05'],
      ['CENTRAL MATRIZ METRO 06'],
      ['CENTRAL MATRIZ METRO 07'],
      ['CENTRAL MATRIZ METRO 08'],
      ['CENTRAL OCCIDENTE 01'],
      ['CENTRAL OCCIDENTE 02'],
      ['MULTIACCESO SIN MG'],
      ['REPETIDORA CON CELDA Y MOTOGENERADOR'],
      ['REPETIDORA CON MOTOGENERADOR'],
      ['REPETIDORA CON O SIN CELDA CON O SIN MG CENTRAL 01'],
      ['REPETIDORA OCCIDENTE CON MG 01'],
      ['REPETIDORA OCCIDENTE CON MG 02'],
      ['REPETIDORA OCCIDENTE CON O SIN MG 03'],
      ['SHELTER CON CELDA SIN MG'],
      ['SHELTER CON/SIN AIRE ACONDICIONADO'],
      ['SHELTER CON/SIN AIRE ACONDICIONADO EN CELDA Y MG'],
      ['SITIO DE CELDA CON MG CONTINUO'],
      ['SITIO DE CELDA CON MG, CON/SIN AIRE ACONDICIONADO'],
      ['SITIO DE CELDA CON PANELES SOLARES Y MG'],
      ['SITIO DE CELDA COUBICADO SIN MG'],
      ['SITIO DE CELDA CUBICADO SIN MG'],
    ];

    const services = data.map(([name]) => ({
      id: uuidv4(),
      name,
      description: '',
      organizationId,
      serviceTypeId,
      isActive: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('service', services, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('service', null, {});
  },
};
