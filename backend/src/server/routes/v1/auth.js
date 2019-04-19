const Router = require('koa-router');
const koaBody = require('koa-body');
const { OAuth2Client } = require('google-auth-library');

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

async function verify(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: googleClientId,
  });

  return ticket.getPayload();
}

async function createUser(ctx) {
  const { idToken } = ctx.request.body;

  let payload = {};
  try {
    payload = await verify(idToken);
  } catch (err) {
    console.error(err);
    ctx.throw(401, 'Google authentication failed!', { error: err });
  }

  ctx.assert(payload.email_verified, 401, 'Google email is not verified');
  ctx.assert(payload.email, 401, 'Google authentication failed!');

  let user = null;
  try {
    user = await services.getUserByEmail({ email: payload.email });
  } catch (err) {
    ctx.throw(500, 'Cannot create user', { error: err });
  }

  ctx.body = user;
}

// TODO: remove after tests
// async function sendHtml(ctx) {
//   const { createReadStream } = require('fs');

//   ctx.type = 'text/html; charset=utf-8';
//   ctx.body = createReadStream(`${__dirname}/auth.html`);
// }
// router.get('/', sendHtml);

router.post('/', koaBody(), createUser);

module.exports = router;
