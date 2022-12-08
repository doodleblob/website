const Koa = require('koa');

const defaultPort = 8080
const port = process.env.PORT || defaultPort

const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello World';
});





module.exports = app.listen(port, () => console.log(`Listening on port: ${port}`))