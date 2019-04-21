// const { createReadStream } = require('fs');

const Koa = require('koa');

const chat = require('./chat');

const { chatPort: port } = require('../config');

const app = new Koa();

app.on('error', err => {
  // TODO: add logger
  console.error({ err });
});

// app.use(async (ctx, next) => {
//   if (ctx.path !== '/' && ctx.path !== '/index.html') {
//     await next();
//     return;
//   }

//   try {
//     ctx.type = 'text/html; charset=utf-8';
//     ctx.body = createReadStream(`${__dirname}/index.html`);
//   } catch (err) {
//     ctx.throw(500, 'Cannot read file', { error: err });
//   }
//   await next();
// });

let server = null;
function listen() {
  if (server != null) return server;

  server = app.listen(port, () => {
    console.log(`Chat is listening on port ${port}`);
  });

  chat.attach(server);
  return server;
}

module.exports = {
  listen,
};
