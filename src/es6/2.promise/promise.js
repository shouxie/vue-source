const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const resolvePromise = (promise2, x,resolve,reject) => {
  if (promise2 === x){ // 说明死循环了，直接拒绝即可
    console.log('xxxxxxx')
    // new TypeError('error')
    return reject('xxxxxxx111')
  }
}
class Promise{
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
    // 递归 每次调用then的时候都返回一个新的promise2
    let promise2 = new Promise((resolve,reject) => {
      if (this.status === RESOLVED){
        setTimeout(() => {
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

// let p = new Promise((resolve,reject)=>{
//   resolve()
// })
// p.then((res)=>{
//   return 100
// }).then((data)=>{
//   console.log(data) // 100
// })

let p1 = new Promise((resolve)=>{
  resolve()
})
let p2 = p1.then(()=>{
  return p2
})
p2.then(()=>{
  console.log('success')
},err=>{
  console.log(err)
})




















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
  console.log(data)
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