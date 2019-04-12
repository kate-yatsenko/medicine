const createKnex = require('knex');

const { DB, NODE_ENV } = require('../config');

const isProd = NODE_ENV === 'production';

const knex = createKnex({
  client: 'pg',
  connection: {
    user: DB.USER,
    host: DB.HOST,
    database: DB.NAME,
    password: DB.PASSWORD,
    port: DB.PORT,
  },
  pool: { min: DB.POOL_MIN, max: DB.POOL_MAX },

  debug: !isProd,
  asyncStackTraces: !isProd,

  // TODO: add to logger
  log: {
    warn(message) {
      console.warn(message);
    },
    error(message) {
      console.error(message);
    },
    deprecate(message) {
      console.warn(message);
    },
    debug(message) {
      console.log(message);
    },
  },
});

module.exports = knex;
