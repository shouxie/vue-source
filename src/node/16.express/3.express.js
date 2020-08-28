// 回调函数如何处理错误

// 可以使用别人的插件
const express = require('./express')
let app = express()
// cookie path 路径以他为开头就可以匹配到
app.use('/',function(req,res,next){
  console.log(1)
  next('error-中间件出错了')
})

app.use('/',function(req,res,next){
  console.log(2)
  next()
})

app.use('/a',function(req,res,next){
  console.log(3)
  next()
})

app.get('/a',function(req,res,next){
  res.end('a')
  next('error-路由出错了')
})
app.get('/',function(req,res,next){
  res.end('a home')
})

app.use(function(err,req,res,next){

})
// 中间件一般放在路由的前面 方便扩展属性，可以做权限处理
app.listen(3000)