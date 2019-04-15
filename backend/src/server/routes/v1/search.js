const Router = require('koa-router');

const services = require('../../../services');

const {
  ENDPOINT_PREFIX_SEARCH,
  SEARCH_STRING_MIN_LENGTH: MIN_LENGTH,
} = require('../../../config');

const router = new Router({
  prefix: ENDPOINT_PREFIX_SEARCH,
});

async function validateSearch(ctx, next) {
  if (MIN_LENGTH <= 0) {
    await next();
    return;
  }
  const { name: rawName } = ctx.query;

  ctx.assert(rawName && rawName.length, 400, 'Invalid search query!');

  const name = rawName.trim();
  ctx.assert(name.length >= MIN_LENGTH, 400, 'Search name is too short!');

  ctx.query.name = name;
  await next();
}

async function getList(ctx) {
  // TODO: validate id
  const { uid: excludeId } = ctx.params;
  const { name } = ctx.query;

  try {
    ctx.body = await services.getUserList({ name, excludeId });
  } catch (err) {
    ctx.throw(500, 'Cannot get list', { error: err });
  }

  ctx.assert(ctx.body, 404, 'Entry not found');
}

router.get('/', validateSearch, getList);

module.exports = router;
