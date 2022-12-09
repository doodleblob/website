'use strict';

const Koa = require('koa');
const render = require('koa-ejs');
const Router = require('@koa/router');
const serve = require('koa-static')

const path = require('path');

const defaultPort = 1337
const port = process.env.PORT || defaultPort

const app = new Koa();
const router = new Router();

render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: false
});

app.use(async (ctx, next) => {
  try {
    await next()
    if (ctx.status === 404) ctx.throw(404)
  } catch(err) {
    console.log(err.status)
    ctx.status = err.status || 500;
    ctx.body = `Error: ${err.status}\n${err.message}`;
  }
});

router.get('/', async ctx => {
  await ctx.render('main')
});

router.get('/:page', async ctx => {
  try {
    await ctx.render(ctx.params.page)
  } catch (e) {
    ctx.throw(404)
  }
});

router.get('/:page/:page_id', async ctx => {
  try {
    await ctx.render( `${ctx.params.page}_entry`)
  } catch (e) {
    ctx.throw(404)
  }
});

app.use(serve("public"));

app.use(router.routes())
app.use(router.allowedMethods());

module.exports = app.listen(port, () => console.log(`Listening on port: ${port}`))