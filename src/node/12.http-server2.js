/*
 * @Author: shouxie
 * @Date: 2020-08-18 15:53:08
 * @Description: 
 */

 /*
let xhr = new XMLHttpRequest()
xhr.open('get','http://localhost:3000/data',true)
shr.setRequestHeader('token','11') // 复杂请求
xhr.responseType = 'json'
xhr.onload = function(){
  // 状态4 并且服务端返回2开头
  console.log(typeof xhr.response)
}
xhr.send() // 放的数据 需要当前是post方法


let xhr = new XMLHttpRequest()
xhr.open('post','http://localhost:3000/data',true)
shr.setRequestHeader('token','11') // 复杂请求
xhr.responseType = 'json'
xhr.onload = function(){
  // 状态4 并且服务端返回2开头
  console.log(typeof xhr.response)
}
xhr.send('name=123') // 放的数据 需要当前是post方法
*/



const http = require('http')
const url = require('url')
const fs = require('fs').promises
const path = require('path')
const mime = require('mime')
const {createReadStream} = require('fs')
/*
可以通过async await 处理请求
*/
class Server {

  // constructor(){
  //   this.handleRequest = this.handleRequest.bind(this)
  // }
  async handleRequest(req,res){ // 保证此方法中的this永远指向server实例
    let {pathname} = url.parse(req.url,true)
    let absPath = path.join(__dirname,pathname)
    // pathname 有可能是一个ajax请求
    // 建议放一个ip地址 尽量不要写*
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','token') // 允许接收token这个字段
    res.setHeader('Access-Control-Allow-Methods','PUT,DELETE')
    res.setHeader('Access-Control-Max-Age',10*60) // 单位为秒，减少预检请求
    if (pathname==='/data'){
      // options 试探性请求 只有复杂请求的时候会发送options请求
      if (req.method.toLowerCase()==='options'){
        return res.end()
      }
      switch(req.method.toLowerCase()){
        case 'get':
          res.setHeader('Content-Type','application/json')
          res.end(JSON.stringify({name:'1'}))
        case 'delete':
          res.end(JSON.stringify({name:'1'}))
        case 'post':
          res.end(JSON.stringify({name:'1'}))
      }
      return
    }


    try {
      console.log(fs.stat,'fs.stat')
      let statObj = await fs.stat(absPath)
      if (statObj.isDirectory()){
        absPath = path.join(absPath,'index.html')
        await fs.access(absPath)
      }
      this.sendFile(req,res,absPath)
    } catch (error) {
      //也可以放在 看一下这个pathname是不是个接口
      console.log(error)
      this.sendError(req,res)
    }
  }
  sendFile(req,res,absPath){
    res.setHeader('Content-Type',mime.getType(absPath)+';charset=utf-8')
    createReadStream(absPath).pipe(res)
  }
  sendError(req,res){
    res.statusCode = 404;
    res.end('not found')
  }
  start(...args){
    // 解决this 可以通过箭头函数的方式
    // bind 可以绑定this指向返回一个绑定后的函数，参数会传递给真正的函数
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}
let server = new Server()
server.start(3000,function(){
  console.log('server start 3000')
})


/*
跨域是浏览器的行为 服务器通信不存在跨域的
跨域：协议，主机，端口 有一个不相等就是跨域
解决方案：
iframe
window.name 父子域
nginx
websocket
jsonp：借助没有跨域问题的标签，style img（pv uv点击数）script（cdn）
对应的后端：
      const {pathname,query} = url.parse(req.url,true)
      res.end(`${query.callback}({name:'11'})`)


      function xxx(data){
        console.log(data)
      }
      let scriptEle = document.createElement('script')
      scriptEle.src = 'http://localhost:3000/data?callback=xxx'
      document.appendChild(scriptEle)
cors:纯后端允许跨域
http-proxy
*/

