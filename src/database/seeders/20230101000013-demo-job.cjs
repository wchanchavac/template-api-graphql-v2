const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);
    const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const names = [
      ['ASISTENTE ADMINISTRATIVO'],
      ['Analista en Sistemas A'],
      ['Analista en Sistemas B'],
      ['Auditoría Interna'],
      ['Coordinadora Administrativa de Proyecto'],
      ['Corporativo Red Móvil'],
      ['Digitador'],
      ['Digitador / controlador'],
      ['GERENTE PLANTA INTERNA'],
      ['Gerente'],
      ['Gerente Corporativo O&M'],
      ['Gerente OyM Campo'],
      ['Operador Administrativo'],
      ['SUBGERENTE DE CENTRO DE MANTENIMIENTO DE EQUIPO'],
      ['Sub Gerencia OyM Red Fija'],
      ['Sub Gerente'],
      ['Sub Gerente Red Móvil'],
      ['Subgerente Metro Centro Sur'],
      ['Supervisor Gestión OyM'],
      ['Supervisor Multihabilidad'],
      ['Supervisor Red Móvil'],
      ['Supervisor Sistemas Alarma'],
      ['Supervisor de Conmutación'],
      ['Supervisor de Energía'],
      ['Técnico Especializado Energía'],
      ['Técnico Multihabilidad'],
      ['Técnico en Conmutación'],
    ];

    const jobs = names.map(([name]) => ({
      id: uuidv4(),
      name,
      organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('job', jobs, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('job', null, {});
  },
};
