const Router = require('koa-router');

const validator = require('../../middleware/validator');
const services = require('../../../services');

const {
  endpoint: {
    prefix: { search },
  },
  searchStringMinLength: minLength,
} = require('../../../config');

const router = new Router({
  prefix: search,
});

async function validateSearch(ctx, next) {
  if (minLength <= 0) {
    await next();
    return;
  }
  const { name: rawName } = ctx.query;

  ctx.assert(rawName && rawName.length, 400, 'Invalid name query!');

  const name = rawName.trim();
  ctx.assert(name.length >= minLength, 400, 'Search name is too short!');

  ctx.query.name = name;
  await next();
}

async function getList(ctx) {
  const { uid: excludeId } = ctx.params;
  const { name } = ctx.query;

  try {
    ctx.body = await services.getUserList({ name, excludeId });
  } catch (err) {
    ctx.throw(500, 'Cannot get list', { error: err });
  }

  ctx.assert(ctx.body, 404, 'Entry not found');
}

router.get('/', validator.idParam({ name: 'uid' }), validateSearch, getList);

module.exports = router;
