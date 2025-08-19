const oracledb = require('oracledb');

const env = process.env.NODE_ENV;

const config = {
  [env]: {
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_SERVICE_NAME || process.env.DB_DATABASE || '',
    host: process.env.DB_HOST || '',
    dialect: process.env.DB_DIALECT,
    dialectModule: oracledb,
  },
};

module.exports = config;
