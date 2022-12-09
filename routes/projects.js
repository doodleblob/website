router = new require('@koa/router')()

router.get('/', async ctx => {
    await ctx.render('projects')
})

router.get('/:project_id', async ctx => {
    await ctx.render('projects_entry')
})

module.exports = router