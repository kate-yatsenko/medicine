const db = require('../db');
const validator = require('./validator');

function formEntry(entry) {
  const e = entry;
  return {
    id: e.id,
    owner: { id: e.ownerId, name: e.ownerName },
    creator: { id: e.creatorId, name: e.creatorName },
    type: {
      id: e.entryTypeId,
      name: e.entryTypeName,
      description: e.entryTypeDescription,
    },
    title: e.title,
    description: e.description,
    result: e.result,
    created: e.created,
  };
}

module.exports = {
  validator,

  async createEntry({
    ownerId,
    creatorId,
    typeId,
    title,
    description,
    result,
  }) {
    const entryId = await db.entry.createEntry({
      ownerId,
      creatorId,
      typeId,
      title,
      description,
      result,
    });
    return this.getEntry(entryId);
  },

  async getEntry(id) {
    const entry = await db.entry.getEntry(id);
    return formEntry(entry);
  },

  async getEntries(
    { ownerId = null, creatorId = null, typeId = null },
    page = 1,
    filter,
  ) {
    const rawResult = await db.entry.getEntries(
      { ownerId, creatorId, typeId },
      page,
      filter,
    );

    return { ...rawResult, entries: rawResult.entries.map(formEntry) };
  },

  async updateEntry({ id, title, description, result }) {
    const entryId = await db.entry.updateEntry({
      id,
      title,
      description,
      result,
    });

    return entryId ? this.getEntry(entryId) : entryId;
  },

  async createUser({ name, email, gender, phone, address, birth }) {
    const userId = await db.user.createUser({
      name,
      email,
      gender,
      phone,
      address,
      birth,
    });
    return db.user.getUser(userId);
  },

  getUser(id) {
    return db.user.getUser(id);
  },

  async updateUser({ id, name, email, gender, phone, address, birth }) {
    const userId = await db.user.updateUser({
      id,
      name,
      email,
      gender,
      phone,
      address,
      birth,
    });

    return userId ? this.getUser(userId) : userId;
  },

  getUserRole(userId) {
    return db.userRole.getRole({ userId });
  },

  getUserList({ name, excludeId }) {
    return db.user.getList({ name, excludeId });
  },

  getUserIdByEmail({ email }) {
    return db.user.getIdByEmail({ email });
  },

  getEntryTypes(id = null) {
    return db.entryType.get(id);
  },

  async createEntryType({ name, description = null }) {
    const id = await db.entryType.create({ name, description });
    return this.getEntryTypes(id);
  },

  async updateEntryType({ id, name, description = null }) {
    const typeId = await db.entryType.update({ id, name, description });
    return typeId ? this.getEntryTypes(typeId) : typeId;
  },

  getMessages({ sender, receiver }) {
    return db.chat.get({ sender, receiver });
  },

  markMessagesAsRead(ids) {
    return db.chat.markAsRead(ids);
  },

  getNewMessagesCount({ receiver }) {
    return db.chat.getNewMessagesCount({ receiver });
  },

  createMessage({ sender, receiver, message }) {
    return db.chat.create({ sender, receiver, message });
  },

  getChatStatus({ id }) {
    return db.chat.getStatus({ id });
  },
};
