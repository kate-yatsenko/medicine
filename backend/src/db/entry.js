const knex = require('./knex');

module.exports = {

  // createEntry({ ownerId, creatorId, entryTypeId, title, description, result }) {
  //   return knex('entry')
  //     .returning('id')
  //     .insert({
  //       ownerId,
  //       creatorId,
  //       entryTypeId,
  //       title,
  //       description,
  //       result,
  //     })
  //     .then(ids => ids[0]);
  // },

  getOwnerEntries({ ownerId }) {
    return knex({ e: 'entry' })
      .where({ ownerId })
      .join('user as o', { 'e.ownerId': 'o.id' })
      .join('user as c', { 'e.creatorId': 'c.id' })
      .join('entryType as et', { 'e.typeId': 'et.id' })
      .orderBy('e.created')
      .select(
        'e.id',
        { ownerId: 'o.id' },
        { ownerName: 'o.name' },
        { creatorId: 'c.id' },
        { creatorName: 'c.name' },
        { entryTypeId: 'et.id' },
        { entryTypeName: 'et.name ' },
        { entryTypeDescription: 'et.description' },
        'e.title',
        'e.description',
        'e.result',
        'e.created',
      );
  },

  // updateEntry({ id, name, email, gender, phone, address, birth }) {
  //   return knex('user')
  //     .where({ id })
  //     .returning('id')
  //     .update({
  //       name,
  //       email,
  //       gender: gender.toUpperCase(),
  //       phone,
  //       address,
  //       birth,
  //     })
  //     .then(ids => ids[0]);
  // },

  // getEntryType({ id }) {
  //   return knex('entryType')
  //     .where({ id })
  //     .select(
  //       'u.id',
  //       { roleName: 'role.name' },
  //       'u.name',
  //       'u.email',
  //       'u.gender',
  //       'u.phone',
  //       'u.address',
  //       'u.birth',
  //       'u.created',
  //     .first();
  // },
};
