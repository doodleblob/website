const Router = require('@koa/router')
const router = new Router()

router.get('/', async ctx => {
  const articles = [{
      title: "Test Article 1",
      timestamp: new Date(),
      description: "Hello"
  },
  {
      title: "Test Article 2",
      timestamp: new Date(),
      description: "World",
  }]

  await ctx.render('projects', { articles: articles })

})

router.get('/:project_id', async ctx => {
  await ctx.render('projects_entry')
})

module.exports = router
