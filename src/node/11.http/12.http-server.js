/*
 * @Author: shouxie
 * @Date: 2020-08-18 14:44:17
 * @Description: 
 */
/*
内容：
实现客户端和服务器 实现静态服务
ajax获取数据，跨域头相关header设置
强制缓存和协商缓存304
*/
const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

// http.createServer(function(){})
let server = http.createServer()
server.on('request',function(req,res){
  // 路由 根据不同的路径 返回不同的结果
  let {pathname} = url.parse(req.url)
  // 静态服务 http://localhost:3000
  let absFilePath = path.join(__dirname,pathname)
  fs.stat(absFilePath,function(err,statObj){
    if(err){ // 文件不存在
      res.statusCode = 404
      return res.end('not found')
    }
    // 1 直接访问的是一个文件 2 访问的是一个目录。如果是目录，需要找到目录下的index.html 
    if(statObj.isDirectory()){
      // 服务器上没有../ 路径，不能通过../ 找服务器的上一层 可以采用相对路径，或者绝对路径 /指代的是当前服务器
      let homePath = path.join(absFilePath,'index.html')
      fs.access(homePath,function(err,data){
        if(err){
          res.statusCode = 404
          return res.end('not found')
        } else {
          res.setHeader('Content-Type',mime.getType(homePath)+';charset=utf-8')
          fs.createReadStream(homePath).pipe(res)
        }
      })
    } else {
      // fs.readFile(function(err,data){
      //   res.end(data)
      // })
      res.setHeader('Content-Type',mime.getType(absFilePath)+';charset=utf-8')
      fs.createReadStream(absFilePath).pipe(res)
    }
  })

})

server.listen(8080,function(){
  console.log('server start 8080')
})