const fs = require('fs');
const jwt = require('jsonwebtoken');

const { tokenExpiresIn: expiresIn } = require('../../config');

const privateKEY = fs.readFileSync(`${__dirname}/../../../private.key`);
const publicKEY = fs.readFileSync(`${__dirname}/../../../public.key`);

const issuer = 'GeekMed';
const algorithm = 'RS256';

module.exports = {
  async create(ctx) {
    const { id, roleId, name, email } = ctx.tokenPayload;

    const signOptions = {
      issuer,
      expiresIn,
      algorithm,
    };

    try {
      const token = jwt.sign(
        { id, roleId, name, email },
        privateKEY,
        signOptions,
      );
      ctx.set('authorization', `Bearer ${token}`);
    } catch (err) {
      ctx.throw(500, 'Cannot create token', { error: err });
    }
  },

  async verify(ctx, next) {
    const { authorization } = ctx.header;
    ctx.assert(authorization && authorization.startsWith('Bearer '), 401);

    const token = authorization.split(' ')[1];
    const verifyOptions = {
      issuer,
      expiresIn,
      algorithm: [algorithm],
    };

    try {
      ctx.tokenPayload = jwt.verify(token, publicKEY, verifyOptions);
    } catch (err) {
      ctx.throw(401, 'Invalid JWT Token');
    }
    await next();
  },
};
