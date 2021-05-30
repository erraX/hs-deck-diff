const router = require('koa-router')();
const { getCardModel } = require('../model/CardModel');

router.prefix('/card');

router.get('/:id', async (ctx, next) => {
  const cardModel = await getCardModel()

  const card = cardModel.get(ctx.params.id);
  if (!card) {
    ctx.body = {
      code: 404,
      message: 'Not found',
    };
  }
  else {
    ctx.body = {
      code: 0,
      data: card,
    };
  }
});

router.post('/get', async (ctx, next) => {
  const cardModel = await getCardModel()

  const ids = ctx.request.body.ids;
  const cards = ids
    .map(id => cardModel.get(id))
    .filter(Boolean)
    .sort((a, b) => (Number(a.cost) - Number(b.cost)) || (Number(a.uid) - Number(b.uid)));

  ctx.body = {
    code: 0,
    data: cards,
  };
})

module.exports = router;
