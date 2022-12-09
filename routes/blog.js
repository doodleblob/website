const Router = require('@koa/router')
const router = new Router()

router.get('/', async ctx => {
  await ctx.render('blog')
})

router.get('/:project_id', async ctx => {
  await ctx.render('blog_entry')
  console.log("!")
})

module.exports = router
