// const Koa = require('koa')
const Koa = require('./koa')
const fs = require('fs')
const path = require('path')
// 需要先实例化一个koa的实例
const app = new Koa()
app.listen(3000,function(){
  console.log('server start 3000')
})
/*
middleware 中间件

ctx context 上下文  (req,res,request,response ) -> context

req,res 原生的
request,response  koa自己封装的对象，基于req，res来封装的
*/
app.use(function(ctx,next){ // 请求到来时执行的函数
  console.log(ctx.req.url)
  console.log(ctx.request.req.url)

  console.log(ctx.request.url)
  console.log(ctx.url)
  // ctx.body = 'hello world'
  // ctx.response.body = 'hello world'
  ctx.body = fs.createReadStream(path.join(__dirname,'package.json'))
  // ctx.body = {name:'xxx'}
  // throw new Error('error')
})

// 监控错误
app.on('error',function(err){
  console.log(err,'==========')
})

// koa 核心：use方法  ctx