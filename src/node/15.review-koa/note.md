## 简答

### 1. js 垃圾回收机制

引用计数

js 是自动内存管理，分新生代和老生代，新生代主要使用Scvenge进行管理，新生代分为from和to两个空间，开始回收的时候会检查from中的存活对象，如果存活拷贝到to中，然后交换

老生代主要采用Mark-Sweep（标记清除，可能会导致内存碎片的问题）和Mark-Compact（标记整理，将活着的对象移动到左侧，速度慢）



默认会将对象存储到from区域，如果from满了，开始垃圾回收，将有用的对象存储到to那里，之后清空from，之后交换from和to，交换5次，如果这个对象一直没有被销毁，将当前对象放到老生代中

### 2. 函数节流和函数防抖

解决高频事件

防抖:最终执行一次（在固定时间后不再执行的时候执行）



节流：一段时间内只执行一次

```js
function debounce(fn,delay){ // 节流
// 不停的清除定时器只留最后一个
    let timer = null
    return function(){
      clearTimeout(timer)
      timer = setTimeout(()=>{
        fn.call(this,...arguments)
      },delay)

    }
  }
body.onscroll = debounce(function(){
  console.log('滚动')
},1000)

function throttle(fn,delay){
  let start = Date.now()
  return function(){
    let last = Date.now()
    fn.apply(this,arguments)
    start = last
  }
}
```

lodash

### 3. new new

```js
// 一个函数返回值是引用类型，可以接着new
function A(){
  return function(){
    this.a = 'a'
    this.b = 'b'
  }
}
let instance = new new A()
```


### 4. Promise.resolve

如果resolve了一个成功的promise，会向当前微任务队列中放入一个函数
``()=>{p.then(res)}``(对应下面代码)``const promise = new Promise(res=>res(p))``,规范要求，如果resolve 一个promise 会将当前resolve的promise.then 方法放到当前微任务的函数中执行

```js
const p = Promise.resolve()
;(()=>{
  const implicit_promise = new Promise(resolve=>{
    const promise = new Promise(res=>res(p))
    promise.then(()=>{
      console.log('after:await')
      resolve()
    })
  })
  return implicit_promise
})()
p.then(()=>{
  console.log('tick:a')
}).then(()=>{
  console.log('tick:b')
}).then(()=>{
  console.log('tick:c')
})
/*
tick:a
tick:b
after:await
tick:c
*/
```

### 5. async + await 问题

```js
setTimeout(function(){
  console.log('settimeout')
},0)
async function asyncFunc1(){
  console.log('asyncFunc1 start')
  await asyncFunc2()
  // Promise.resolve(asyncFunc2()) === asyncFunc2()
  // 两种写法两种优化
  // 1. Promise.resolve(asyncFunc2()).then(()=>{
  //   console.log('asyncFunc1 end')
  // })

  // 2. new Promise(resolve => resolve(asyncFunc2())).then(()=>{
  //   console.log('asyncFunc1 end')
  // })
  console.log('asyncFunc1 end')
}
async function asyncFunc2(){
  console.log('asyncFunc2')
}
console.log('script start')
asyncFunc1()
new Promise(function (resolve){
  console.log('promise1')
  resolve()
}).then(function(){
  console.log('promise2')
})
console.log('script end')
/*
node
script start
asyncFunc1 start
asyncFunc2
promise1
script end
promise2
asyncFunc1 end
settimeout

浏览器
script start
asyncFunc1 start
asyncFunc2
promise1
script end
asyncFunc1 end
promise2
undefined
settimeout
*/
```

### 1. 在浏览器地址输入URl 按下回车后究竟发生了什么

1. 浏览器通过DNS将url地址解析为ip（如果有缓存直接返回缓存，否则递归解析）
2. 通过DNS解析得到了目标服务器的IP地址后，与服务器建立TCP连接
     - ip协议： 选择传输路线，负责找到
     - tcp协议： 三次握手 ，分片，可靠传输，重新发送的机制
3. 浏览器通过http协议发送请求（增加http的报文信息）头  行  体
4. 服务器接受请求后，查库，读文件 ，拼接好返回的http响应
5. 浏览器收到html 开始渲染
6. 解析html为dom，解析css为css-tree，最终生成render-tree 阻塞渲染
7. 遍历渲染树开始布局，计算每个节点的位置大小信息
8. 将渲染树每个节点绘制到屏幕
9. 加载js文件，运行js脚本
10. reflow（样式）与repaint（位置）

### 2. 常见的优化

- 缓存：
  - http中缓存 强制缓存和对比缓存的应用（304） memory disk
  - service worker 和 cahce api（离线缓存 HTTPS） pwa
  - Push Cache 推送缓存 HTTP/2 中的内容
- 压缩：

    - gzip压缩，找重复出现的字符串，临时替换，让整个文件变小，重复率越高压缩率越高，zlib模块
- 本地存储
  - localstorage sessionStorage session cookie indexDB，cacheApi
  - localStorage/sessionStorage 不会发送给服务器
  - IndexDB 浏览器中的非关系型数据库
  - cacheApi 离线缓存
- cdn：
  内容分发网络  负载均衡  就近返回内容

- defer&async / preload & prefetch
   
   - defer 和 async 在网络读取的过程中都是异步解析
   - defer 是有顺序依赖的，async只要脚本加载完后就会执行
   - preload 可以对当前页面所需的脚本，样式等资源进行预加载
   - prefetch 加载的资源一般不是用于当前页面的，是未来很可能用到的这样一些资源




### 3. 304 缓存原理

### 4. koa中间件执行机制

### 5. koa和express区别

### 6. 三次握手 四次断开

三次握手：

第一次握手：客户端发送一个SYN码给服务器，要求建立数据连接

第二次握手：服务器SYN和自己处理一个SYN（标志），叫SYN-ACK（确认包），发送给客户端，可以建立连接

第三次握手：客户端再次发送ACK向服务器 服务器验证ACK没有问题，则建立起连接

四次挥手：

第一次： 客户端发送FIN结束报文，通知服务器数据已经传输完毕

第二次： 服务器接收到之后，通知客户端我收到来SYN发送ACK（确认）给客户端，数据还没有传输完成

第三次： 服务器已经传输完毕，再次发送FIN通知客户端，数据已传输完毕

第四次： 客户端再次发送ACK进入TIME_WAIT状态 服务器和客户端关闭连接

### 7. 为什么建立连接是三次握手，而断开连接是四次挥手

建立连接的时候，服务器在LISTEN状态下，收到建立连接请求的SYN报文后，把ACK和SYN放在一个报文里发送给客户端，而关闭连接时，服务器收到对方的FIN报文时，仅仅表示对方不再发送数据了但是还能接收数据，而自己也未必全部数据都发送给对方了，所以己方可以立即关闭，也可以发送一些数据给对方后，再发送FIN报文给对方来表示同意现在关闭连接，因此，己方ACK和IFN一般都会分开发送，从而导致多了一次