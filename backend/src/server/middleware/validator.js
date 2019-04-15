const utils = require('../../utils');

const {
  DB: { SERIAL_MIN, SERIAL_MAX },
} = require('../../config');

function checkId(number) {
  const id = Number.parseInt(number, 10);

  if (Number.isNaN(id)) throw new Error('ID must be a number!');

  if (!utils.inRange(id, SERIAL_MIN, SERIAL_MAX)) {
    throw new Error(`ID must be in range ${SERIAL_MIN} to ${SERIAL_MAX}`);
  }

  return id;
}

module.exports = {
  TYPE: {
    ID: checkId,
  },

  idParam({ name, type = this.TYPE.ID }) {
    return async (ctx, next) => {
      try {
        type(ctx.params[name]);
      } catch (err) {
        ctx.throw(400, err.message, { error: err });
      }
      await next();
    };
  },
};
