'use strict';

const Koa = require('koa');
const Router = require('@koa/router');

const defaultPort = 1337
const port = process.env.PORT || defaultPort

const app = new Koa();
const router = new Router();

app.use(async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    console.log(err.status)
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});

router.get('/', (ctx) => {
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