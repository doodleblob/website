router = new require('@koa/router')()

router.get('/', async ctx => {
    await ctx.render('blog')
})

router.get('/:project_id', async ctx => {
    await ctx.render('blog_entry')
})

module.exports = router