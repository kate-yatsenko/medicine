const knex = require('./knex');

module.exports = {
  create({ sender, receiver, message }) {
    return knex({ m: 'message' })
      .returning(['id', 'sender', 'receiver', 'created', 'isRead'])
      .insert({ sender, receiver, message })
      .then(results => results[0]);
  },

  markAsRead({ ids, receiver }) {
    return knex('message')
      .whereIn('id', ids)
      .andWhere({ receiver })
      .update({ isRead: true }, ['id', 'sender']);
  },

  getNewMessagesCount({ receiver }) {
    return knex({ m: 'message' })
      .where({ receiver, isRead: false })
      .count()
      .first();
  },

  get({ sender, receiver }) {
    return knex({ m: 'message' })
      .where({ sender, receiver })
      .orWhere({ sender: receiver, receiver: sender })
      .join('user as s', { 's.id': 'm.sender' })
      .join('user as r', { 'r.id': 'm.receiver' })
      .orderBy('m.created', 'asc')
      .select(
        'm.id',
        'm.message',
        'm.sender',
        { senderName: 's.name' },
        { receiverName: 'r.name' },
        'm.receiver',
        'm.created',
        'm.isRead',
      );
  },

  getStatus({ id }) {
    return knex({ m: 'message' })
      .where({ receiver: id })
      .join('user as u', { 'u.id': 'm.sender' })
      .groupBy('m.sender', 'u.name')
      .select(
        'm.sender',
        'u.name',
        knex.raw(
          'count ("isRead") filter (where "isRead" = false) as "unread"',
        ),
      );
  },
};
