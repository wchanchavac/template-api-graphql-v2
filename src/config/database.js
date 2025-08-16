export default {
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_SERVICE_NAME || process.env.DB_DATABASE || '',
  host: process.env.DB_HOST || '',
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: console.log,
  port: process.env.DB_PORT || '3306',
  pool: {
    max: 1,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
};
