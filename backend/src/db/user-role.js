const knex = require('./knex');

module.exports = {
  getRole({ userId: id }) {
    return knex({ u: 'user' })
      .where({ 'u.id': id })
      .join('role as r', { 'u.roleId': 'r.id' })
      .select(
        'r.id',
        'r.name',
        'r.canReadAllCards',
        'r.canCreateEntry',
        'r.canManageRole',
      )
      .first();
  },

  getRolesWhere({ canReadAllCards = false }) {
    return knex('role')
      .where({ canReadAllCards })
      .select();
  },
};
