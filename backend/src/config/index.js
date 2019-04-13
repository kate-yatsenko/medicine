const dotenvConfig = require('dotenv').config();

if (dotenvConfig.error) throw dotenvConfig.error;

const { env } = process;

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
  CORS_ORIGIN: env.API_CORS_ORIGIN,
  CORS_ALLOW_METHODS: 'GET,POST,OPTIONS',
  CORS_MAX_AGE: 86400, // 1 day

  RESPONSE_JSON_ERROR_NAME: 'error',

  ENDPOINT_PREFIX_V1: '/v1',
  ENDPOINT_PREFIX_USER: '/users',
  ENDPOINT_PREFIX_ENTRY: '/entry',

  ENDPOINT_ROOT_RESPONSE: {
    name: 'Medicine API',
    version: '1.0',
    git: 'https://github.com/kate-yatsenko/medicine',
  },

  NODE_ENV: env.NODE_ENV,
};
