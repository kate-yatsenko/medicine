const Router = require('koa-router');
const koaBody = require('koa-body');
const { OAuth2Client } = require('google-auth-library');
const { create } = require('../../middleware/jwt');

const services = require('../../../services');

const {
  googleClientId,
  endpoint: {
    prefix: { auth },
  },
} = require('../../../config');

const router = new Router({
  prefix: auth,
});

const client = new OAuth2Client(googleClientId);

async function verify(ctx, idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: googleClientId,
  });

  return ticket.getPayload();
}

async function authUser(ctx, next) {
  const { idToken } = ctx.request.body;

  let payload = null;
  try {
    payload = await verify(ctx, idToken);
  } catch (err) {
    console.error(err);
    ctx.throw(401, 'Google authentication failed!', { error: err });
  }

  ctx.assert(payload.email_verified, 401, 'Google email is not verified');
  ctx.assert(payload.email, 401, 'Email not found!');
  ctx.assert(payload.name, 401, 'Name not failed!');

  let user = null;
  try {
    user = await services.getUserIdByEmail({ email: payload.email });
  } catch (err) {
    ctx.throw(500, 'Cannot get user', { error: err });
  }

  const isRegistered = user != null;

  try {
    if (!isRegistered) {
      const {
        name,
        email,
        gender = '',
        phone = '',
        address = '',
        birth = '0',
      } = payload;

      user = await services.createUser({
        name,
        email,
        gender,
        phone,
        address,
        birth,
      });
    }
  } catch (err) {
    ctx.throw(500, 'Cannot create user', { error: err });
  }

  ctx.tokenPayload = user;
  await next();
  ctx.body = { isRegistered };
}

// TODO: remove after tests
// async function sendHtml(ctx) {
//   const { createReadStream } = require('fs');

//   ctx.type = 'text/html; charset=utf-8';
//   ctx.body = createReadStream(`${__dirname}/auth.html`);
// }
// router.get('/', sendHtml);

router.post('/', koaBody(), authUser, create);

module.exports = router;
