const Koa = require('koa');
const cors = require('@koa/cors');

const errorHandler = require('./middleware/error-handler');
const rootRouter = require('./routes');

const {
  PORT,
  CORS_ORIGIN,
  CORS_ALLOW_METHODS,
  CORS_MAX_AGE,
} = require('../config');

const app = new Koa();

app.on('error', (err, ctx) => {
  // TODO: add logger
  console.error({ err });
  console.error(`HREF: ${ctx.href}`);
});

const corsOptions = {
  origin: CORS_ORIGIN,
  allowMethods: CORS_ALLOW_METHODS,
  maxAge: CORS_MAX_AGE,
  // TODO: set proper options
  // credentials: true,
  // keepHeadersOnError: true,
};

app.use(errorHandler());

app.use(cors(corsOptions));

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

function listen() {
  return app.listen(PORT, () => {
    console.log(`Web API is listening on port ${PORT}`);
  });
}

module.exports = {
  listen,
  koaApp: app,
};
