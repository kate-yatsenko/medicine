const dotenvConfig = require('dotenv').config();

if (dotenvConfig.error) throw dotenvConfig.error;

const { env } = process;

module.exports = {
  db: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    name: env.DB_NAME,
    port: env.DB_PORT,
    poolMin: 0,
    poolMax: 2,

    serialMin: 1,
    serialMax: 2147483647,
  },

  chatPort: env.CHAT_PORT,

  googleClientId: env.GOOGLE_CLIENT_ID,

  port: env.API_PORT,
  cors: {
    jrigin: env.API_CORS_ORIGIN,
    allowMethod: 'GET,POST,OPTIONS',
    maxAge: 86400, // 1 day
  },

  responseJsonErrorName: 'error',
  responseResultsPerPage: 10,
  responseRoot: {
    name: 'Medicine API',
    version: process.env.npm_package_version || 'Use npm to get version number',
    git: 'https://github.com/kate-yatsenko/medicine',
  },

  searchStringMinLength: 0,
  searchStringMaxLength: 100,

  endpoint: {
    prefix: {
      v1: '/v1',
      auth: '/auth',
      user: '/users',
      entry: '/entries',
      entryType: '/etypes',
      search: '/search',
    },
  },

  nodeEnv: env.NODE_ENV,
};
