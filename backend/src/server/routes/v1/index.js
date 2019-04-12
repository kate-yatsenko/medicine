const Router = require('koa-router');

const userRoute = require('./user');

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

module.exports = router;
