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

    const userTypes = data.map(([id, name, level]) => ({
      id,
      name,
      level,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('userType', userTypes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userType', null, {});
  },
};
