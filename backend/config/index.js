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
  },

  PORT: env.API_PORT,
  CORS_ORIGIN: env.API_CORS_ORIGIN,
  CORS_ALLOW_METHODS: 'GET,POST,OPTIONS',

  RESPONSE_JSON_ERROR_NAME: 'error',

  ENDPOINT_PREFIX_V1: '/v1',
  ENDPOINT_ROOT_RESPONSE: {
    name: 'Medicine API',
    version: '1.0',
    git: 'https://github.com/kate-yatsenko/medicine',
  },
};
