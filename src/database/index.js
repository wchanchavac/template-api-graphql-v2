import { Sequelize } from 'sequelize';
import config from '../config/database.js';
import operatorsAliases from './operatorsAliases.js';
import initUserModel from './models/user.model.js';

const { database, username, password, ...configWithoutCredentials } = config;
const sequelize = new Sequelize(database, username, password, {
  ...configWithoutCredentials,
  operatorsAliases,
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const User = initUserModel(sequelize);

console.log('revisar');

const models = {
  User,
};

export default { sequelize, ...models };
