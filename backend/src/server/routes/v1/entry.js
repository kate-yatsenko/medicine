const Router = require('koa-router');
const koaBody = require('koa-body');

const services = require('../../../services');

const { ENDPOINT_PREFIX_ENTRY } = require('../../../config');

const router = new Router({
  prefix: ENDPOINT_PREFIX_ENTRY,
});

function getPayload(ctx) {
  // TODO: parse body
  return ctx.request.body;
}

async function getEntries(ctx) {
  // TODO: validate id
  const { uid: userId } = ctx.params;

  try {
    const role = await services.getUserRole(userId);

    const creatorId = role.canReadAllCards ? userId : null;
    const ownerId = role.canReadAllCards ? null : userId;

    ctx.body = await services.getEntries({ ownerId, creatorId });
  } catch (err) {
    ctx.throw(500, 'Cannot get entries', { error: err });
  }
  ctx.assert(ctx.body, 404, 'Entry not found');
}

async function createEntry(ctx) {
  // TODO: validate payload

  try {
    ctx.body = await services.createEntry(getPayload(ctx));
  } catch (err) {
    ctx.throw(500, 'Cannot create entry', { error: err });
  }
}

async function updateEntry(ctx) {
  // TODO: validate payload

  try {
    ctx.body = await services.updateEntry({
      ...getPayload(ctx),
      id: ctx.params.id,
    });
  } catch (err) {
    ctx.throw(500, 'Cannot update entry', { error: err });
  }

  ctx.assert(ctx.body, 404, 'Entry not found');
}

// TODO: id validator middleware
router.get('/', getEntries);
// router.get('/:id', getEntries);
router.post('/', koaBody(), createEntry);
router.post('/:id', koaBody(), updateEntry);

module.exports = router;