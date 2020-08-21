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
const {createReadStream,readFileSync} = require('fs')
const ejs = require('ejs')
let template = readFileSync(path.resolve(__dirname,'template.html'),'utf8')
class Server {
  constructor(config){
    this.config = config
    this.template = template
  }
  async handleRequest(req,res){ // 保证此方法中的this永远指向server实例
    let {pathname} = url.parse(req.url,true)
    // let absPath = path.join(__dirname,pathname)
    let absPath = path.join(this.config.directory,decodeURIComponent(pathname))
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
      
      let statObj = await fs.stat(absPath)
      if (statObj.isDirectory()){
        let home = 'index.html'
        absPath = path.join(absPath,home)
        // 如果abspath不存在，需要列出当前的文件夹下的目录
        try {
          await fs.access(absPath)
        } catch (error) {
          // 读取文件夹下的目录显示给客户端
          let currentDir = absPath.slice(0,-home.length)
          let dirs = await fs.readdir(currentDir) // 读取当前目录下的内容
          // ssr 模板引擎 ejs 
          let processPathName = pathname==='/'?'':pathname
          let templateStr = ejs.render(this.template,{dirs,parent:processPathName})
          res.setHeader('Content-Type','text/html;charset=utf8')
          return res.end(templateStr)
        }
        
      }
      this.sendFile(req,res,absPath,statObj)
    } catch (error) {
      //也可以放在 看一下这个pathname是不是个接口
      console.log(error)
      this.sendError(req,res)
    }
  }
  cache(req,res,absPath,statObj){
    // 1 设置强制缓存和对比缓存
    res.setHeader('Expires',new Date(Date.now()+10000).toGMTString())
    res.setHeader('Cache-Control','max-age=10')

    let eTag = statObj.size + ''
    let ctime = statObj.ctime.toGMTString()

    res.setHeader('Etag',eTag)
    res.setHeader('Last-Modified',ctime)

    let clientIfNoneMatch = req.headers['if-none-match']
    let clientIfModifiedSince = req.headers['if-modified-since']
    let flag = true;
    // etag 每个 koa express 生成的方式都不一样
    if(eTag !== clientIfNoneMatch){
      flag = false
    }
    if(clientIfModifiedSince !== ctime){
      flag = false;
    }
    
    // if(eTag)
    return flag
  }

  gzip(req,res,absPath,statObj){
    let encoding = req.headers['accept-encoding']
    let zlib = require('zlib')
    if(encoding.includes('gzip')){
      res.setHeader('Content-Encoding','gzip')
      return zlib.createGzip()
    }else if (encoding.includes('deflate')){
      res.setHeader('Content-Encoding','deflate')
      return zlib.createDeflate()
    }
    return false;

  }
  async sendFile(req,res,absPath,statObj){
    // 制作缓存
    if (this.cache(req,res,absPath,statObj)){
      res.statusCode= 304
      return res.end()

    }
    // 如果没缓存，希望将文件压缩后返回
    let zip = this.gzip(req,res,absPath,statObj)
    if(zip){ // 如果支持。默认返回的就是一个压缩流
      return  createReadStream(absPath).pipe(zip).pipe(res)
    }
    res.setHeader('Content-Type',mime.getType(absPath)+';charset=utf-8')
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

// let server = new Server()
// server.start(8080,function(){
//   console.log('server start 8080')
// })

module.exports = Server


//服务器 Content-Encoding：gzip
//客户端 Accept-Encoding：gzip，deflate，br
// 压缩 转化流 支持回调的写法
