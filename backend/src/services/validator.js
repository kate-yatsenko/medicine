const utils = require('../utils');

const {
  db: { serialMin, serialMax },
} = require('../config');

module.exports = {
  checkId(number) {
    const id = Number.parseInt(number, 10);

    if (Number.isNaN(id)) throw new Error('ID must be a number!');

    if (!utils.inRange(id, serialMin, serialMax)) {
      throw new Error(`ID must be in range ${serialMin} to ${serialMax}`);
    }

    return id;
  },
};
