const dotenvConfig = require('dotenv').config();

if (dotenvConfig.error) throw dotenvConfig.error;

const { parsed: env } = dotenvConfig;

module.exports = {
  DB: {
    USER: env.DB_USER,
    PASSWORD: env.DB_PASSWORD,
    HOST: env.DB_HOST,
    NAME: env.DB_NAME,
    PORT: env.DB_PORT,
    POOL_MIN: 0,
    POOL_MAX: 2,
  },

  PORT: env.API_PORT,

  NODE_ENV: env.NODE_ENV,
};
