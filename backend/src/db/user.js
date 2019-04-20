const knex = require('./knex');

const { searchStringMaxLength: searchLimit } = require('../config');

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
        'u.roleId',
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

  updateUserRole({ userId, roleId }) {
    return knex('user')
      .where({ id: userId })
      .update({ roleId }, ['id'])
      .then(ids => ids[0]);
  },

  getList({ name, excludeId, roleIds }) {
    return knex({ u: 'user' })
      .whereIn('u.roleId', roleIds)
      .andWhere('u.name', 'ilike', `%${name}%`)
      .andWhereNot({ 'u.id': excludeId })
      .limit(searchLimit)
      .orderBy('u.name')
      .select('u.id', 'u.name', 'u.email', 'u.birth');
  },

  getIdByEmail({ email }) {
    return knex({ u: 'user' })
      .where({ email })
      .join('role', { 'u.roleId': 'role.id' })
      .select(
        'u.id',
        { roleName: 'role.name' },
        'u.roleId',
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
};
