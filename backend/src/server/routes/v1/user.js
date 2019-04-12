const Router = require('koa-router');
const services = require('../../../services');

const { ENDPOINT_PREFIX_USER } = require('../../../config');

const router = new Router({
  prefix: ENDPOINT_PREFIX_USER,
});

async function getUser(ctx) {
  const userId = ctx.params.id;

  try {
    ctx.body = await services.getUser(userId);
  } catch (err) {
    ctx.throw(500, 'Cannot get user', { error: err });
  }
  ctx.assert(ctx.body, 404, 'User not found');
}

router.get('/:id', getUser);

module.exports = router;
