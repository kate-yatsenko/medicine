const Router = require('koa-router');

const userRoute = require('./user');
const entryTypes = require('./entry-type');

const {
  ENDPOINT_PREFIX_V1,
  ENDPOINT_ROOT_RESPONSE,
} = require('../../../config');

const router = new Router({
  prefix: ENDPOINT_PREFIX_V1,
});

router.get('/', ctx => {
  ctx.body = ENDPOINT_ROOT_RESPONSE;
});

router.use(userRoute.routes()).use(userRoute.allowedMethods());
router.use(entryTypes.routes()).use(entryTypes.allowedMethods());

module.exports = router;
