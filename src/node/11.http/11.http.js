/*
 * @Author: shouxie
 * @Date: 2020-07-31 18:06:04
 * @Description: 
 */ 
/*
tcp/ip 协议族  整个的所有协议

协议会分层   ios7层模型

应用层   http   ftp dns  http基于传输层 新增了很多 报文等
表示层
会话层
传输层  tcp udp 
网络层  ip协议
数据链路层 === 
物理层 ===设备 网线


tcp：安全 可靠（三次握手 四次断开） 不会丢数据 如果数据丢失会重新发送  传输分段



http报文分类：
请求头报文 content-type
请求行报文  method HTTP/1.1 /index.html
请求体报文 {name:''}



服务器收到客户端发来的请求 会根据当前的请求信息 返回最终的结果


curl -v http://www.baidu.com 发送请求命令

restful风格 对接口操作的一种风格
/user  get
/user post


简单请求：get post 都是简单请求
但是加了自定义的头信息就是复杂请求

状态码：
1xx  webstocket
2xx  200 成功 201 204 没有响应体 206 分段传输
3xx  301 永久重定向 302 临时重定向 304 缓存，服务端缓存
4xx  401 没权限  404  400 参数错误 403 没有权限访问 405 方法不允许
5xx 500 502 负载均衡问题




请求方法  get（获取资源） post（新增资源） delete options（跨域请求的时候，非简单请求才会出现） put(上传文件，修改)
*/


const http = require('http')
const url = require('url') // 专门用来解析url路径的
// 使用http模块  1.创建请求 2 接收请求
const querytring = require('querystring')
/*
querytring:

console.log(querytring.parse('a=1&b=2')) // { a: '1', b: '2' }
console.log(querytring.parse('a=1*b=2','*','=')) // { a: '1', b: '2' }
*/

let server = http.createServer(function(req,res){// 请求到来时会执行此方法
  // node 中的http 单线程 尽量采用异步,否则会阻塞运行，尽量不要使用cpu密集型（计算）操作
  let {pathname,query} = url.parse(req.url,true)
  let httpVersion = req.httpVersion
  let method = req.method.toLowerCase()
  // 请求行 ------------------------------------
  let headers = req.headers // 所有的header信息都是小写的,对象类型
  // 请求体 -可读流-----------------------------------
  let arr = []
  req.on('data',function(chunk){
    arr.push(chunk)
  }) // tcp分段 可能触发多次

  req.on('end',function(){
    // console.log(Buffer.concat(arr).toString())
    let content = Buffer.concat(arr).toString()
    if (req.headers['content-type']==='application/x-www-form-urlencoded'){
      content = querytring.parse(content)
    } else if (req.headers['content-type']==='application/json'){
      content = JSON.parse(content)
    }
    res.statusCode = 404 // 必须要合法
    res.setHeader('a','1') // 设置头
    res.setHeader('b','2')
    res.setHeader('Content-Type','text/plain;charset=utf-8') // 实体头
    // res 是一个可写流
    res.write(content.a)
    res.end()
    // res.end(content.a) // 表示当前响应结束
  })

  if(req.url==='/'){
    res.end('end')
  }
  
  /*
  req

  req.httpVersion
  req.method
  req.url


  res
  
  */
})
let port = 3000
server.listen(port,function(){ 
  
  console.log('server start' + port)
  
})
//eaddrinuse 如果端口号被占用了 直接重新监听新的端口号即可
server.on('error',function(err){
  if (err.errno==='EADDRINUSE'){
    server.listen(++port)
  }
  console.log(err)
})


// 一个服务器只能有一个对应的使用端口

//每次更改服务端代码都需要重新启动服务器   
// nodemon可以实现代码重启功能，可以指定哪个文件变化了 可以自动重启


/*
url路径 

*/
let str = 'http:username:password@www.baidu.com:80/source?query=1#app'
console.log(url.parse(str))