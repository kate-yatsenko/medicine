const jwt = require('../../utils/jwt');

module.exports = {
  async create(ctx) {
    const { id, roleId, name, email } = ctx.tokenPayload;

    try {
      const token = jwt.create({ id, roleId, name, email });
      ctx.set('authorization', `Bearer ${token}`);
    } catch (err) {
      ctx.throw(500, 'Cannot create token', { error: err });
    }
  },

  async verify(ctx, next) {
    const { authorization } = ctx.header;
    ctx.assert(authorization && authorization.startsWith('Bearer '), 401);

    const token = authorization.split(' ')[1];

    try {
      ctx.tokenPayload = jwt.verify(token);
    } catch (err) {
      ctx.throw(401, 'Invalid JWT Token');
    }
    await next();
  },
};
