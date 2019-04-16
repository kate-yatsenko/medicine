const knex = require('./knex');

module.exports = {
  create({ name, description = null }) {
    return knex({ et: 'entryType' })
      .returning('id')
      .insert({ name, description })
      .then(ids => ids[0]);
  },

  get(id = null) {
    const query = knex({ et: 'entryType' }).select(
      'et.id',
      'et.name',
      'et.description',
    );

    if (id == null) return query.orderBy('et.name');

    return query.where({ id }).first();
  },

  update({ id, name, description = null }) {
    return knex({ et: 'entryType' })
      .where({ id })
      .returning('id')
      .update({ name, description })
      .then(ids => ids[0]);
  },
};
