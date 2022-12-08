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

router.get('/', async ctx => {
  await ctx.render('index')
});

router.get('/projects', async ctx => {
  await ctx.render('projects')
});

router.get('/projects/:project_id', async ctx => {
  //ctx.params.project_id
  await ctx.render('project_entry')
});

router.get('/blog', async ctx => {
  await ctx.render('blog')
})

router.get('/blog/:blog_id', async ctx => {
  //ctx.params.blog_id
  await ctx.render('blog_entry')
})

app.use(router.routes())
app.use(router.allowedMethods());

module.exports = app.listen(port, () => console.log(`Listening on port: ${port}`))