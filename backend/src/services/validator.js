const utils = require('../utils');

const {
  DB: { SERIAL_MIN, SERIAL_MAX },
} = require('../config');

module.exports = {
  checkId(number) {
    const id = Number.parseInt(number, 10);

    if (Number.isNaN(id)) throw new Error('ID must be a number!');

    if (!utils.inRange(id, SERIAL_MIN, SERIAL_MAX)) {
      throw new Error(`ID must be in range ${SERIAL_MIN} to ${SERIAL_MAX}`);
    }

    return id;
  },
};
