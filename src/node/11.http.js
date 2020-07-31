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

// 使用http模块  1.创建请求 2 接收请求

let server = http.createServer(function(){

})

server.listen(3000,function(){
  
})