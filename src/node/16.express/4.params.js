// user/:id/:name  => user/1/2 ==> {id:1,name:2}
const express = require('express')
const app = express()

app.get('/user/:id/:name',function(req,res,next){
  res.end(JSON.stringify(req.params))
})

app.listen(3000)

let reg = /\user\/(\w+?)\/(\w+?)\/a/
let configUrl = '/user/:id/:name'
let realPath = '/user/1/2'
realPath.match(reg)
let keys = []
let regStr = configUrl.replace(/:([^\/]+)/g,function(){
  keys.push(arguments[1])
  return '([^\/]+)'
})
let [,...others] = realPath.match(new RegExp(regStr))
console.log(others)