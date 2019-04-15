const Router = require('koa-router');
const koaBody = require('koa-body');

const services = require('../../../services');

const { ENDPOINT_PREFIX_ENTRY_TYPE } = require('../../../config');

const router = new Router({
  prefix: ENDPOINT_PREFIX_ENTRY_TYPE,
});

function getPayload(ctx) {
  // TODO: parse body
  return ctx.request.body;
}

async function getTypes(ctx) {
  try {
    ctx.body = await services.getEntryTypes();
  } catch (err) {
    ctx.throw(500, 'Cannot get entry types', { error: err });
  }
}

async function getType(ctx) {
  const { id } = ctx.params;

  try {
    ctx.body = await services.getEntryTypes(id);
  } catch (err) {
    ctx.throw(500, 'Cannot get entry type', { error: err });
  }
  ctx.assert(ctx.body, 404, 'Entry type not found');
}

async function createType(ctx) {
  // TODO: validate payload

  try {
    ctx.body = await services.createEntryType(getPayload(ctx));
  } catch (err) {
    if (err.code === '23505') {
      ctx.throw(409, 'Type with this name already exists', { error: err });
    }

    ctx.throw(500, 'Cannot create entry type', { error: err });
  }
}

async function updateType(ctx) {
  // TODO: validate payload
  try {
    ctx.body = await services.updateEntryType({
      ...getPayload(ctx),
      id: ctx.params.id,
    });
  } catch (err) {
    if (err.code === '23505') {
      ctx.throw(409, 'Type with this name already exists', { error: err });
    }

    ctx.throw(500, 'Cannot update entry type', { error: err });
  }

  ctx.assert(ctx.body, 404, 'Entry type not found');
}

// TODO: add id validator middleware
router.get('/', getTypes);
router.get('/:id', getType);
router.post('/', koaBody(), createType);
router.post('/:id', koaBody(), updateType);

module.exports = router;
