const db = require('../db');

module.exports = {
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
    return this.getUser(userId);
  },
};
