const { v4: uuidv4 } = require('uuid');

// import bcrypt from 'bcryptjs';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash('password', salt);

    const organizationId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
    const names = [
      ['ALTA VERAPAZ', 'AVR'],
      ['BAJA VERAPAZ', 'BVR'],
      ['CHIMALTENANGO', 'CHM'],
      ['CHIQUIMULA', 'CHQ'],
      ['EL PROGRESO', 'EPR'],
      ['EL QUICHE', 'EQC'],
      ['ESCUINTLA', 'ESC'],
      ['GUATEMALA', 'GTM'],
      ['HUEHUETENANGO', 'HHT'],
      ['IZABAL', 'IZB'],
      ['JALAPA', 'JLP'],
      ['JUTIAPA', 'JTP'],
      ['PETEN', 'PTN'],
      ['QUETZALTENANGO', 'QTZ'],
      ['RETALHULEU', 'RTL'],
      ['SACATEPEQUEZ', 'SCT'],
      ['SAN MARCOS', 'SMR'],
      ['SANTA ROSA', 'SRS'],
      ['SOLOLA', 'SLL'],
      ['SUCHITEPEQUEZ', 'SCH'],
      ['TOTONICAPAN', 'TTN'],
      ['ZACAPA', 'ZCP'],
    ];

    const states = names.map(([name, abbreviation]) => ({
      id: uuidv4(),
      name,
      abbreviation,
      organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('state', states, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('state', null, {});
  },
};
