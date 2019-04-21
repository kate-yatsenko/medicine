const services = require('../../services');

module.exports = {
  hasAcces({ ...access }) {
    return async (ctx, next) => {
      const { tokenPayload: { id = null } = null } = ctx;
      const userRole = await services.role.getUserRole(id);

      const keys = Object.keys(access);
      const hasAccess = keys.every(key => {
        if (!access[key]) return !access[key];

        return userRole[key] === access[key];
      });

      ctx.assert(hasAccess, 403);
      await next();
    };
  },
};
