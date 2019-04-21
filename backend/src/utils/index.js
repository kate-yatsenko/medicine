const jwt = require('./jwt');

module.exports = {
  jwt,

  inRange(number, min, max) {
    if (number >= min && number <= max) return true;

    return false;
  },
};
