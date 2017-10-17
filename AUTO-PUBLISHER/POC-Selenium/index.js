const Koa = require('koa')
const scrapper = require('./scrapper')
const app = module.exports = new Koa()

app.use(async function(ctx) {
  ctx.body = 'Running';
  scrapper();
});

if (!module.parent) app.listen(3000);
