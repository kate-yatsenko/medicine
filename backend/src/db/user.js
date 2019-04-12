const knex = require('./knex');

module.exports = {
  createUser({ name, email, gender, phone, address, birth }) {
    return knex('user')
      .returning('id')
      .insert({
        name,
        email,
        gender: gender.toUpperCase(),
        phone,
        address,
        birth,
        roleId: 1,
      })
      .then(ids => ids[0]);
  },

  getUser(id) {
    return knex({ u: 'user' })
      .where({ 'u.id': id })
      .join('role', { 'u.roleId': 'role.id' })
      .select(
        'u.id',
        { roleName: 'role.name' },
        'u.name',
        'u.email',
        'u.gender',
        'u.phone',
        'u.address',
        'u.birth',
        'u.created',
      )
      .first();
  },

  updateUser({ id, name, email, gender, phone, address, birth }) {
    return knex('user')
      .where({ id })
      .returning('id')
      .update({
        name,
        email,
        gender: gender.toUpperCase(),
        phone,
        address,
        birth,
      })
      .then(ids => ids[0]);
  },

  updateUserRole({ id, roleId }) {
    return knex('user')
      .where({ id })
      .update({ roleId }, ['id']);
  },
};
