/*
 * @Author: shouxie
 * @Date: 2020-08-20 11:41:33
 * @Description: 防盗链：防止你盗用别人的链接；
 * 请求头中会有Referer，表示谁引用了我的资源，跟host对比不一样就禁用
 * 
 * 
 * csrf 后面会讲
 */
const http = require('http')
const path = require('path')
const fs = require('fs')
const url = require('url')
const whiteList = [ // 白名单
  'node.qpp.cn'
]
const server = http.createServer((req,res)=>{
  // 只针对图片进行单独的防盗链处理
  const {pathname,query} = url.parse(req.url,true)
  const abspath = path.join(__dirname,pathname)
  fs.stat(abspath,function(err,statObj){
    if (err){
      res.statusCode = 404
      res.end('not found')
      return
    }
    if (statObj.isFile()){
      // 图片 后缀
      if (/(\.png)|(\.jpg)/.test(abspath)){
        // 先看有没有referer(referer 是拼写错误  referer referrer)
        let referer = req.headers['referer'] || req.headers['referrer']
        if (referer){
          // 需要获取到用户的referer 和当前的自己的host域名去比对
          let hostname = req.headers['host']
          referer = url.parse(referer).host
          console.log(referer,hostname)
          if (hostname !== referer && !whiteList.includes(referer)){ // 如果不一样，应该是盗用了本服务下的图片
            let errorFile = path.join(__dirname,'images/error.jpg')
            return fs.createReadStream(errorFile).pipe(res)
          }
          /*
          图片地址：http://node1.qpp.cn:3000/images/1.jpg
          referer:http://node.qpp.cn:3000/index.html （表示引用资源的域名）
          hostname:node1.qpp.cn:3000（表示，请求资源自己的host）
          */
        }
      }
      fs.createReadStream(abspath).pipe(res)
    }else {
      res.statusCode = 404
      res.end('not found')
      return
    }
  })
})
server.listen(3000)
