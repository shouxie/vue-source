// 二级路由 路由拆分

const Koa = require('koa')
const Router = require('koa-router')

let app = new Koa()

let user = new Router()
let article = new Router()
// 前缀的方式 来增加 命名空间
user.prefix('/user')
user.get('/add',(ctx,next)=>{
  ctx.body = 'add'
})
user.get('/remove',(ctx,next)=>{
  ctx.body = 'remove'
})

article.prefix('/article')

article.get('/add',(ctx,next)=>{
  ctx.body = 'add'
})
app.use(article.routes())

app.use(user.routes())
app.listen(3000)