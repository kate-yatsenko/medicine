const Koa = require('koa');
const cors = require('@koa/cors');

const errorHandler = require('./middleware/error-handler');
const rootRouter = require('./routes');

const { port, cors: corsConfig } = require('../config');

const app = new Koa();

app.on('error', (err, ctx) => {
  // TODO: add logger
  console.error({ err });
  console.error(`HREF: ${ctx.href}`);
});

const corsOptions = {
  ...corsConfig,
  // origin: cors.origin,
  // allowMethods: cors.allowMethods,
  // maxAge: cors.maxAge,
  // TODO: set proper options
  // credentials: true,
  // keepHeadersOnError: true,
};

app.use(errorHandler());

app.use(cors(corsOptions));

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

function listen() {
  return app.listen(port, () => {
    console.log(`API is listening on port ${port}`);
  });
}

module.exports = {
  listen,
  koaApp: app,
};
