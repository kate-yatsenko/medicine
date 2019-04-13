const db = require('../db');

module.exports = {
  // async createEntry({
  //   ownerId,
  //   creatorId,
  //   entryTypeId,
  //   title,
  //   description,
  //   result,
  // }) {
  //   const entryId = await db.entry.createEntry({
  //     ownerId,
  //     creatorId,
  //     entryTypeId,
  //     title,
  //     description,
  //     result,
  //   });
  //   return this.getEntry(entryId);
  // },

  async getOwnerEntries({ ownerId }) {
    const entries = await db.entry.getOwnerEntries({ ownerId });
    return entries.map(e => {
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
    });
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
    return this.getUser(userId);
  },
};
