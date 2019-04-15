module.exports = {
  inRange(number, min, max) {
    if (number >= min && number <= max) return true;

    return false;
  },
};
