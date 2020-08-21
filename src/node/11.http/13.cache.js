/*
 * @Author: shouxie
 * @Date: 2020-08-18 18:02:57
 * @Description: 
 */
/*
缓存 后端设置前端缓存 和缓存的有效期
*/
const fs = require('fs').promises
const http = require('http')
const path = require('path')
const url = require('url')
const mime = require('mime')
class Server {
  async handleRequest(req,res){ // 保证此方法中的this永远指向server实例
    let {pathname} = url.parse(req.url,true)
    let absPath = path.join(__dirname,pathname)
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
      this.sendFile(req,res,absPath,statObj)
    } catch (error) {
      //也可以放在 看一下这个pathname是不是个接口
      console.log(error)
      this.sendError(req,res)
    }
  }
  async sendFile(req,res,absPath,statObj){
    // 多次访问服务器 会不停的读取文件返回，如果连续访问我，可以做缓存
    // 1 强制缓存 像max-age 多少秒之内不要再访问了  状态码还是200，只对当前文件引用的资源生效，不对首页生效
    // 10s内访问相同的资源不要再访问我了
    // Exipres Cache-Control 兼容
    res.setHeader('Exipres',new Date(Date.now()+10000).toGMTString())
    res.setHeader('Cache-Control','max-age=10')
    res.setHeader('Content-Type',mime.getType(absPath)+';charset=utf-8')
    // 浏览器自动判断 disk cache 硬盘缓存  memory cache 内存 比较快，使用频繁的可以存入
    res.setHeader('Cache-Control','no-cache') // 每次都强制向服务器发请求，不访问缓存，禁用缓存
    res.setHeader('Cache-Control','no-store') // 不存储缓存

    // 2 对比缓存，协商缓存
    let lastModified = statObj.ctime.toGMTString()
    
    let ifModifiedSince = req.headers['if-modified-since']
    res.setHeader('Last-Modified',lastModified)
    // 设置了Last-Modified，浏览器请求自动带上if-modified-since
    if (ifModifiedSince==lastModified){
      // 以秒为单位 不够准确，可能最后修改时间变了，但是文件没变
      res.statusCode = 304
      res.end() // 走缓存
      return
    }
    // 根据文件内容 做对比缓存，服务端根据文件内容 产生一个唯一的标示，下次访问时带上标示来比对
    // etag 要根据文件内容生成
    
    let data = await fs.readFile(absPath)
    let crypto = require('crypto')
    // let etag = 'xxx' // 代表一个文件的简称  摘要
    let etag = crypto.createHash('md5').update(data).digest('base64')
    res.setHeader('Etag',etag)
    let ifnonematch = req.headers['if-none-match']
    if (etag === ifnonematch){
      res.statusCode = 304
      res.end()
    }
    
    createReadStream(absPath).pipe(res)
  }
  sendError(req,res){
    res.statusCode = 404;
    res.end('not found')
  }
  start(...args){
    const server = http.createServer(this.handleRequest.bind(this))
    server.listen(...args)
  }
}

let server = new Server()
server.start(8080,function(){
  console.log('server start 8080')
})


/*
304
last-modified if-modified-since
etag if-none-match


*/