// 二级路由 路由拆分

const Koa = require('koa')
const Router = require('koa-router')

let app = new Koa()

let user = new Router()
let article = new Router()
let all = new Router()
user.get('/add',(ctx,next)=>{
  ctx.body = 'add'
})
user.get('/remove',(ctx,next)=>{
  ctx.body = 'remove'
})


article.get('/add',(ctx,next)=>{
  ctx.body = 'add'
})
all.use('/user',user.routes())
all.use('/acticle',article.routes())
app.use(all.routes())
app.listen(3000)

app.on('error',function(err,ctx){
// 只能自己定义错误 不能通过ctx.body 去更改更改错误
})

// koa-generator 脚手架
// koa2 -e projectname