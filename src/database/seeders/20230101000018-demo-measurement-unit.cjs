const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);

    const names = [
      ['CONJUNTO', 'CNJ'],
      ['DIA', 'DIA'],
      ['GL', 'GL'],
      ['HA', 'HA'],
      ['KILOMETRO', 'KM'],
      ['METRO', 'M'],
      ['METRO CUADRADO', 'M2'],
      ['METRO CUBICO', 'M3'],
      ['PLANO', 'PLN'],
      ['PUNTO/POSTE', 'PNT'],
      ['SERVICIO', 'SRV'],
      ['UNIDAD', 'UN'],
    ];

    const measurementUnits = names.map(([name, abbreviation]) => ({
      id: uuidv4(),
      name,
      abbreviation,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('measurementUnit', measurementUnits, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('measurementUnit', null, {});
  },
};
