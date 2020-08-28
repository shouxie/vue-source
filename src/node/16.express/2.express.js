const express = require('./express')
const app=express()

app.get('/',function(req,res,next){
  console.log(1)
  next() // express 内部 要提供一个next函数
},function(req,res,next){
  console.log(1)
  next()
},function(req,res,next){
  console.log(1)
  next()
})

app.get('/',function(req,res,next){
  console.log(2)
  next()
})

app.listen(3000)