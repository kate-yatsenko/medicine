const db = require('../db');

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
  ) {
    const rawResult = await db.entry.getEntries(
      { ownerId, creatorId, typeId },
      page,
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
    return this.getUser(userId);
  },

  async getUser(id) {
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

  async getUserRole(userId) {
    return db.userRole.getRole({ userId });
  },
};
