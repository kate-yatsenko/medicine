const Router = require('koa-router');

// TODO: add more endpoints
// const someEndpoint = require('./some-endpoint');

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

// TODO: use endpoints here
// router.use(someEndpoint.routes()).use(someEndpoint.allowedMethods());

module.exports = router;
