const createKnex = require('knex');

const { db, nodeEnv } = require('../config');

const isProd = nodeEnv === 'production';

const knex = createKnex({
  client: 'pg',
  connection: {
    user: db.user,
    host: db.host,
    database: db.name,
    password: db.password,
    port: db.port,
  },
  pool: { min: db.poolMin, max: db.poolMax },

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
