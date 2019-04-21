const Router = require('koa-router');
const koaBody = require('koa-body');

const access = require('../../middleware/access-validator');
const validator = require('../../middleware/validator');
const services = require('../../../services');

const {
  endpoint: {
    prefix: { entryType },
  },
} = require('../../../config');

const router = new Router({
  prefix: entryType,
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

const restrict = access.hasAcces({ canManageEntryType: true });
const idParam = validator.idParam({ name: 'id' });

router.get('/', getTypes);
router.get('/:id', idParam, getType);
router.post('/', restrict, koaBody(), createType);
router.post('/:id', restrict, idParam, koaBody(), updateType);

module.exports = router;
