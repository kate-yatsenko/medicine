const Router = require('koa-router');

const userRoute = require('./user');
const entryTypes = require('./entry-type');
const auth = require('./auth');

const {
  endpoint: {
    prefix: { v1 },
  },
  responseRoot,
} = require('../../../config');

const router = new Router({
  prefix: v1,
});

router.get('/', ctx => {
  ctx.body = responseRoot;
});

router.use(auth.routes()).use(auth.allowedMethods());
router.use(userRoute.routes()).use(userRoute.allowedMethods());
router.use(entryTypes.routes()).use(entryTypes.allowedMethods());

module.exports = router;
