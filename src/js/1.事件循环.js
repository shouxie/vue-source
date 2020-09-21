/*
js中的同步异步编程处理机制

js是单线程的 浏览器是多线程的（浏览器只分了一个线程执行js代码）

浏览器打开一个页面就开辟了一个进程
一个进程中包含多个线程
浏览器渲染一个页面经历： dom tree -》 render tree

js

当浏览器执行js时候（词法解析结束），会开辟堆空间HEAP和栈空间STACK，
所有对象数据类型开辟的堆内存都在heap，
函数执行的时候先进栈，执行完成出栈。

同步编程：在主栈中，只能按照顺序依次让代码执行（进栈和出栈），上面的任务没有出栈，下面的任务不能进栈执行

过多使用同步编程可能会导致线程阻塞，因为某些任务需要一定事件才能处理完成

异步编程： 在主栈执行任务的时候，如果发现当前任务是异步的，定时器，事件绑定，
把这个任务临时移除主栈，通过eventtable 注册回调函数，把后续要做的事情注册到event queue
（事件队列），=》 也就是所有的异步任务暂时都没有执行，都存放到等待执行的事件队列中


异步操作还有一个特点：只有当主栈中的同步任务都彻底完成，才会到等待事件队列中查找到达指定执行条件的回调函数
把函数重新进栈，放到主栈中执行，（并且是谁先到达条件的先执行谁）
当此任务执行完成，再次到等待事件队列中查找即可（这个操作就是js事件循环eventloop）


异步任务的分类：
微任务： Promise.then
        async/await
        process.nextTick（node）
宏任务：定时器（setTimeOut，setInterval，setImmediate（node））
       事件绑定
       ajax中的异步编程


主栈任务执行完成，开始处理异步任务，先处理微任务再处理宏任务
sync-》async（micro-》macro）


当代码执行遇到await 会把后面的函数立即执行，但是需要等待函数返回的promise成功或失败
才能继续执行后面的代码，浏览器会把后面代码的任务放到eventqueue中，但是
它是微任务，主栈执行结束，立即执行的就是这些微任务

new promise 后执行的顺序
1. 先把存放到promise中的函数执行
2. 执行then 但是只是把then中的函数实现存放到eventqueue中，异步微任务
3. 继续执行主栈中的内容
4. 当主栈执行结束，会立即把eventqueue中存放的微任务拿到主栈中执行


async1 end
promise2
在不同浏览器中，顺序有所区别
*/
async function async1(){
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2(){
  console.log('async2')
}
console.log('script start')
setTimeout(() => {
  console.log('setTimeout')
}, 0);
async1()
new Promise(resolve =>{
  console.log('propmise1')
  resolve()
}).then(()=>{
  console.log('promise2')
})

console.log('script end')

/*
script start
async1 start
async2
propmise1
script end

async1 end
promise2
setTimeout
*/



console.log(1)
setTimeout(() => {
  console.log(2)
  new Promise(function(resolve){
    console.log(4)
    resolve()
  }).then(function(){
    console.log(5)
  })
});

new Promise(function(resolve){
  console.log(7)
  resolve()
}).then(function(){
  console.log(8)
})

setTimeout(() => {
  console.log(9)
  new Promise(function(resolve){
    console.log(11)
    resolve()
  }).then(function(){
    console.log(12)
  })
});

/*
浏览器
1
7
8
2
4
5 
9 
11
12
*/
// node 环境下（17824911512）