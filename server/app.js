const Koa = require('koa');
const logger = require('koa-logger');
const json = require('koa-json');
const onerror = require('koa-onerror');

const app = new Koa();

const card = require('./routes/card');

// error handler
onerror(app);

app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
});

// routes definition
app.use(card.routes(), card.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
