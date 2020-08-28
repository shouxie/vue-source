/*
koa
@koa/multer
koa-bodyparser

*/
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()

router.get('/',async(ctx,next)=>{
  ctx.body = 'home'
  next()
})

// 路由，映射关系 /接口  访问不同的路径 返回不同的资源 方法 restful
app.use(router.routes())
app.use(async(ctx)=>{
  ctx.body = 'end'
})
app.listen(3000)