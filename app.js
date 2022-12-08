'use strict';

const Koa = require('koa');
const Router = require('@koa/router');
const render = require('koa-ejs');
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
    ctx.body = `Error ${err.status}\n${err.message}`;
  }
});

router.get('/', (ctx, next) => {
  ctx.body = 'Main';
});

router.get('/projects', (ctx) => {
  ctx.body = 'Projects'
});

router.get('/projects/:project_id', (ctx) => {
  ctx.body = 'Projects ID: ' + ctx.params.project_id
});

router.get('/blog', (ctx) => {
  ctx.body = 'Blog'
})

router.get('/blog/:blog_id', (ctx) => {
  ctx.body = 'Blog ID: ' + ctx.params.blog_id
})

app.use(router.routes())
app.use(router.allowedMethods());

module.exports = app.listen(port, () => console.log(`Listening on port: ${port}`))