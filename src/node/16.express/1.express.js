const express = require('./express')
//express 是一个函数

let app = express()
app.get('/',function(req,res,next){
  res.end('home')
})
// app.all('*',function(req,res){
//   res.end('*')
// })
app.listen(3000)