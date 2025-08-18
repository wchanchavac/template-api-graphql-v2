import oracledb from 'oracledb';
import { Sequelize } from 'sequelize';
import operatorsAliases from './operatorsAliases.js';
// Uncomment this for postgres
// import pg from 'pg';

const config = {
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_SERVICE_NAME || process.env.DB_DATABASE || '',
  host: process.env.DB_HOST || '',
  dialect: process.env.DB_DIALECT,
  dialectModule: oracledb,
  // Uncomment this for postgres
  // dialectModule: pg,
  logging: console.log,
  port: process.env.DB_PORT || '3306',
  pool: {
    max: 1,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
};

const { database, username, password, ...configWithoutCredentials } = config;
const sequelize = new Sequelize(database, username, password, {
  ...configWithoutCredentials,
  operatorsAliases,
});

export default sequelize;
