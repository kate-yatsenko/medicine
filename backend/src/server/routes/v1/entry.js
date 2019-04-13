const Router = require('koa-router');
const koaBody = require('koa-body');

const services = require('../../../services');

const { ENDPOINT_PREFIX_ENTRY } = require('../../../config');

const router = new Router({
  prefix: ENDPOINT_PREFIX_ENTRY,
});

// function getPayload(ctx) {
//   // TODO: parse body
//   return ctx.request.body;
// }

async function getEntries(ctx) {
  // TODO: validate id
  const { uid: ownerId } = ctx.params;

  try {
    ctx.body = await services.getOwnerEntries({ ownerId });
  } catch (err) {
    ctx.throw(500, 'Cannot get entries', { error: err });
  }
  ctx.assert(ctx.body, 404, 'Entry not found');
}

// async function createEntry(ctx) {
//   // TODO: validate payload

//   try {
//     ctx.body = await services.createEntry(getPayload(ctx));
//   } catch (err) {
//     ctx.throw(500, 'Cannot create entry', { error: err });
//   }
// }

// async function updateEntry(ctx) {
//   // TODO: validate payload

//   try {
//     ctx.body = await services.updateUser({
//       ...getPayload(ctx),
//       id: ctx.params.id,
//     });
//   } catch (err) {
//     ctx.throw(500, 'Cannot update entry', { error: err });
//   }
// }

router.get('/', getEntries);
// router.post('/', koaBody(), createEntry);
// router.post('/:id', koaBody(), updateEntry);

module.exports = router;
