
### http-server 服务器


#### package.json


bin:这个包的命令
main: 入口文件
```
"bin":{
  "ws":"./bin/www"
}
"main":"./src/server"
```

#### .npmignore 

用来忽略不需要发布的文件

#### 本地测试：

npm link

取消
npm unlink

#### 发布流程

nrm查看npm源

npm search xxx 查看是否已经存在

npm addUser 登陆用户名，密码

npm publish

#### 安装测试

npm install xxx


#### 缓存

##### 强制缓存


新旧版本兼容：
```
Expries:new Date(Date.now()+10).toGMTString()
Cache-Control:max-age=10
```

Cache-Control: 

no-cache:  每次都请求服务器忽略缓存，禁用缓存

no-store:  每次请求都不设置缓存

##### 协商缓存

1. 服务器设置 ``Last-Modified:``为文件最后修改时间,浏览器请求带上``if-modified-since``。服务器，根据请求头判断两者是否相同，相同返回304走缓存，不相同接着请求

缺点：
-  以秒为单位，不够准确
-  可能时间变了，文件没变


2. 服务器设置Etag，为文件的某个，base64，标示，浏览器请求带上``if-none-match``，服务器根据请求头判断

```js
const http = require('http')
let server = http.createServer(function(req,res){
  ...
  res.setHeader('Expries',new Date(Date.now()+10000).toGMTString())
  res.setHeader('Cache-Control','max-age=10')

  res.setHeader('Last-Modified','xxx')
  res.setHeader('Etag','xxx')
  let cache = req.headers['if-modified-since']
  let etag = req.headers['if-none-match']
  if (cache === fs.ctime()){
    res.statusCode = 304
    return res.end()
  }

  if (etag === 'xxxxxxx'){
    res.statusCode = 304
    return res.end()
  }
})
server.listen(8080,function(){
  console.log('server is starting 8080')
})

```

##### disk cache 和 memory cache

 内存缓存 和硬盘缓存 请求频繁的走内存缓存，比较快

#### 跨域

跨域是浏览器行为，服务器之间不存在跨域

简单请求和复杂请求

1. jsonp
2. iframe
3. nginx
4. webpack
5. window.name  子域
6. webstocket
7. cors 后端解决

options 试探性请求，复杂请求会发送options请求

Access-Control-Allow-Headers
Access-Control-Allow-Methods
Access-Control-Allow-Origin：* 跨域
Access-Control-Allow-Max-Age：10   减少预检请求



#### gzip

请求头： Accept-Encoding：gzip,deflate,br

响应头：Content-Encoding：gzip

node 中不支持br

node中实现压缩，使用到了``zlib``这个包

```js

let http = require('http')
let zlib = require('zlib')
var server = http.createServer(function(req,res){
  ...
  let encoding = req.headers['accept-encoding']
  let zlibRes = ''
  if (encoding.includes('gzip')){
    res.setHeader('Content-Encoding','gzip')
    zlibRes = zlib.createGzip()
  } else if (encoding.includes('deflate')){
    res.setHeader('Content-Encoding','deflate')
    zlibRes = zlib.createDeflate()
  }
  fs.createReadScream(abspath).pipe(zibRes).pipe(res)

})
server.listen(8080,function(){
  console.log('server is starting 8080')
})

```



#### node 用到的包/模块总结

zlib

fs

fs.resolve()  会把/ 当作 根目录
fs.join()

path

mine

url

commander

#### 302 临时重定向

```js
const http = require('http')
let server = http.createServer((req,res)=>{
    // 判断当前浏览器内核 如果是手机端，就跳转到xx，pc端跳转百度
    if(req.headers['user-agent'].includes('iPhone')){
      res.setHeader('Location','http://www.baidu.com')
      res.statusCode = 302
      res.end()
    }else {
      ...
    }
})
server.listen(8080)
```

301:永久；例如：www.360buy.com 自动跳转到jd