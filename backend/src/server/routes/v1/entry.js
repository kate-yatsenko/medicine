const Router = require('koa-router');
const koaBody = require('koa-body');

const access = require('../../middleware/access-validator');
const validator = require('../../middleware/validator');
const services = require('../../../services');

const {
  endpoint: {
    prefix: { entry },
  },
} = require('../../../config');

const router = new Router({
  prefix: entry,
});

function getPayload(ctx) {
  // TODO: parse body
  return ctx.request.body;
}

async function getEntries(ctx) {
  // TODO: validate page
  const { uid: userId } = ctx.params;
  const { p: page, owner, creator, type, filter } = ctx.query;

  try {
    const role = await services.role.getUserRole(userId);

    const creatorId = role.canReadAllCards ? userId : creator;
    const ownerId = role.canReadAllCards ? owner : userId;

    ctx.body = await services.getEntries(
      { ownerId, creatorId, typeId: type },
      page,
      filter,
    );
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

const validateQueryIds = validator.idQuery({
  names: ['owner', 'creator', 'type'],
  required: false,
});

const idParam = validator.idParam({ name: 'id' });
const restrict = access.hasAcces({ canCreateEntry: true });

router.get('/', validateQueryIds, getEntries);
router.post('/', restrict, koaBody(), createEntry);
router.post('/:id', restrict, idParam, koaBody(), updateEntry);

module.exports = router;
