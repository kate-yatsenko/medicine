const { validator } = require('../../services');

module.exports = {
  TYPE: {
    ID: validator.checkId,
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

  idQuery({ names = [], type = this.TYPE.ID, required = true }) {
    return async (ctx, next) => {
      names.forEach(name => {
        if (!required && ctx.query[name] == null) return;

        try {
          type(ctx.query[name]);
        } catch (err) {
          ctx.throw(400, err.message, { error: err });
        }
      });

      await next();
    };
  },
};
