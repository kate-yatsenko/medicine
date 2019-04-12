const db = require('../db');

module.exports = {
  getUser(id) {
    return db.user.getUser(id);
  },
};
