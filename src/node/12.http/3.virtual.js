/*
 * @Author: shouxie
 * @Date: 2020-08-20 16:15:01
 * @Description: 
 */
const mappings = {
  'a.zf.cn':'http://a.z.cn:3000',
  'b.zf.cn':'http://a.z.cn:4000'
}
// 访问80 希望 代理到3000 或者4000 拿到响应到结果 拼接点内容返回给客户端
// 代理 http-proxy 第三方模块

const http = require('http')
const httpProxy = require('http-proxy')

const proxy = httpProxy.createProxyServer() // 创建代理服务器

http.createServer(function(req,res){
  let host = req.headers['host']
  proxy.web(req,res,{
    target:mappings[host],
    selfHandleResponse:true
  })
  proxy.on('proxyRes',function(proxyRes,req,res){
    var body = [] // 监听代理服务器返回的结果
    proxyRes.on('data',function(chunk){
      body.push(chunk)
    })
    proxyRes.on('end',function(){
      body = Buffer.concat(body).toString()
      console.log('res from proxied server:', body)
      // 将结果进行包装 返回给客户端
      res.end('my response to cli'+body)
    })
  })

}).listen(80)