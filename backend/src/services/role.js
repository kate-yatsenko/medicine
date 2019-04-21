const db = require('../db');

module.exports = {
  getRolesWhere({ canReadAllCards = false }) {
    return db.userRole.getRolesWhere({ canReadAllCards });
  },

  getUserRole(userId) {
    return db.userRole.getRole({ userId });
  },
};
