const Router = require('koa-router');

const v1Router = require('./v1');

const router = new Router();

router.get('/', async ctx => {
  ctx.body = { usage: `${ctx.protocol}://${ctx.host}/v1/*` };
});

router.use(v1Router.routes());
router.use(v1Router.allowedMethods());

module.exports = router;
