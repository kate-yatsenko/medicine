const knex = require('./knex');

function getEntriesWhere(whereClause, onlyFirst = false) {
  const clause = whereClause;

  if (clause.id != null) {
    clause['e.id'] = clause.id;
    delete clause.id;
  }

  const query = knex({ e: 'entry' })
    .where(clause)
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

  if (onlyFirst) query.first();

  return query;
}

module.exports = {
  createEntry({ ownerId, creatorId, typeId, title, description, result }) {
    return knex('entry')
      .returning('id')
      .insert({
        ownerId,
        creatorId,
        typeId,
        title,
        description,
        result,
      })
      .then(ids => ids[0]);
  },

  getEntry(id) {
    return getEntriesWhere({ id }, true);
  },

  getEntries({ ownerId = null, creatorId = null, typeId = null }) {
    let where = { ownerId, creatorId, typeId };

    where = Object.entries(where).reduce((acc, pair) => {
      const [name, value] = pair;

      if (value != null) acc[name] = value;

      return acc;
    }, {});

    return getEntriesWhere(where);
  },

  updateEntry({ id, title, description, result }) {
    return knex('entry')
      .where({ id })
      .returning('id')
      .update({
        title,
        description,
        result,
      })
      .then(ids => ids[0]);
  },
};
