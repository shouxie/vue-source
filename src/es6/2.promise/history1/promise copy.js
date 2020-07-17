const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const resolvePromise = (promise2, x,resolve,reject) => {
  if (promise2 === x){ // 说明死循环了，直接拒绝即可
    console.log('x123xxxxxx')
    // new TypeError('error')
    return reject(new TypeError('error'))
  }
  // 判断x的类型 是promise 还是普通值
  /*
    如果x不是对象也不是函数 string null undefined
  */
 if ((typeof x == 'object' && typeof x !== null) || typeof x === 'function'){
    // 如何判断一个对象是不是promise  promise必须要有then方法
    try { // 有可能这个then方法在别人的promise中是通过defineProperty发定义的，取值的时候可能会发生异常，那就让这个promise2变成失败即可
      let then = x.then // 获取then方法
      /*
        x.then
        then
      */
     let called
     if (typeof then == 'function'){
        then.call(x,(y)=>{ // y 可能也是一个promise 解析y 保证他是普通值
          if (called){
            return
          }
          called = true
          resolvePromise(promise2,y,resolve,reject)
          // resolve(y)
        },(r)=>{
          if (called){
            return
          }
          called = true
          reject(r)
        })
     } else { // {x:{then:{}}} 可能的情况
        resolve(x);
     }
      
    } catch (error) {
      if (called){
        return
      }
      called = true
      reject(error)
    }
    
 } else { // x 就是一个普通值
  resolve(x);
 }

}
class Promise1{
  constructor(executor){
    this.value = ''
    this.reason = ''
    this.status = PENDING
    this.onResolveCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.status = RESOLVED
        this.value = value
        this.onResolveCallbacks.forEach(fn => fn())
      }
    }
    let reject = (reason) => {
      
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled,onRejected){
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}
    // 递归 每次调用then的时候都返回一个新的promise2
    let promise2 = new Promise((resolve,reject) => {
      if (this.status === RESOLVED){
        setTimeout(() => { // 使用异步原因：promise2 是实例化以后才会有值
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x,resolve,reject);
          } catch (error) {
              reject(error)
          }
        }, 0);
        // resolve(x) // 只需要拿到then的返回结果，直接将这个值传递给promise2即可
      }
      if (this.status === REJECTED){
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x,resolve,reject);
          } catch (error) {
            reject(error)
          }
        },0)
      }
      if (this.status === PENDING){
        this.onResolveCallbacks.push(()=>{
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x,resolve,reject);
            } catch (error) {
              reject(error)
            }
          },0)
        })
        this.onRejectedCallbacks.push(()=>{
          setTimeout(() => {
            try {
              let x = onRejected(this.value)
              resolvePromise(promise2, x,resolve,reject);
            } catch (error) {
              reject(error)
            }
          },0)
          
        })
      }
    })
    return promise2
  }
}


/*
1) 普通值的情况
*/

/*
let p = new Promise((resolve,reject)=>{
  resolve()
})
p.then((res)=>{
  return 100
}).then((data)=>{
  console.log(data,'data') // 100
})
*/

/*promise2和x相同的情况，相当于p2一直在等待自己状态改变，p2 then return p2
*/

/*
let p1 = new Promise1((resolve)=>{
  resolve()
})
let p2 = p1.then(()=>{ // then中的 成功函数是异步执行的，这时候promise2 已经产生了
  return p2
})
p2.then(()=>{
  console.log('success')
},err=>{
  console.log(err)
})
*/

// x 是个promise，第一个promise返回的是个promise的情况
/*
let p1 = new Promise1((resolve,reject)=>{
  resolve()
})
let p2 = p1.then(()=>{
  return new Promise1((resolve,reject)=>{
    setTimeout(() => {
      resolve('ok');
    }, 1000);
  })
},()=>{})

p2.then((data)=>{
  console.log('success',data);
},err=>{
  console.log(err);
})
 */
// p2 返回的promise 调用x的then方法可能也返回promise 的情况

/*
let p1 = new Promise1((resolve,reject)=>{
  resolve()
})
let p2 = p1.then(()=>{ // 相当于y，y 可能也返回的是promise
  return new Promise1((resolve,reject)=>{
      resolve(new Promise1((resolve,reject)=>{
          setTimeout(() => {
            resolve(100)
          }, 1000);
      }))
  })
})
p2.then((data)=>{ 
  console.log('success',data)
})
*/
/*
data 相当于
new Promise1((resolve,reject)=>{
    setTimeout(() => {
      resolve(100)
    }, 1000);
})
应该返回100
递归
*/
// 穿透的情况
let p1 = new Promise1((resolve,reject)=>{
  resolve(100)
})
p1.then().then().then(data=>{
  console.log(data)
})


// 安装 promises-aplus-tests 测试你写的promise是否符合规范
// 要求又一个入口
Promise.defer = Promise.deferred = function(){
  let dfd = {}
  dfd.promise = new Promise((resolve,reject)=>{
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

// 执行：promises-aplus-tests 文件名



















/*
promise 链式调用
*/
let fs = require('fs')
/*以前的方式*/
/*

fs.readFile('./content.txt','utf8',function(err,data){
  console.log(data)
  fs.readFile(data,'utf8',function(err,data){
    console.log(data)
  })
})
*/

/*
先将代码包装成promise的
*/
/*
function read(...args){
  return new Promise((resolve,reject)=>{
    fs.readFile(...args,function(err,data){
      if (err) reject(err)
      resolve(data)
    })
  })
}
read('./content.txt','utf8').then(data => {
  console.log(data) // hello
},err=>{
  console.log(err)
})
*/
//运行结果： name.txt hello   =====等事件环学完回来思考


/*util zhong promisify 实现原理*/

/*
let promisify = (fn) => { // fs.readFile
  return (...args) => { // read
    return new Promise((resolve,reject)=>{
      fn(...args,function(err,data){
        if (err) reject(err)
        resolve(data)
      })
    })
  }
}
let read = promisify(fs.readFile)
read('./content.txt','utf8').then((res)=>{
  console.log(res)
  read(res,'utf8').then((data)=>{
    console.log(data)
  })
})
*/
// let {promisify} = require('util')


/*
promise 特性 then方法中传递的函数 成功 ，失败，
这两个函数的返回值可以返回一个promise
如果返回的是一个promise 的话，会用这个promise的状态作为下一次then的结果
如果自己有捕获错误，他就不会找catch
这个函数还可以返回普通值
只要不是error，不是promise 都叫普通值，会将这个值作为下一次的
then的结果

1） 返回的是promise 2） 返回的是错误 3） 返回普通值

链式调用的实现是每一次都返回一个新的promise 
*/
/*
let promisify = (fn) => { // fs.readFile
  return (...args) => { // read
    return new Promise((resolve,reject)=> {
      fn(...args,function(err,data){
        if (err) reject(err)
          resolve(data)
      })
    })
  }
}
*/
/*链式调用*/
/*
let read = promisify(fs.readFile)
read('./content.txt','utf8').then(data => {
  console.log(data)
  return read(data+'1','utf8')
},err=>{
  console.log('err1')
}).then((data) => {
  console.log(data)
}).catch(e => {
  console.log('err2')
})
*/