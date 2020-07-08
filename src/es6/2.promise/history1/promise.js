// 自己练习
const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
// promise 的同步实现
class Promise {
  constructor(executor){
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolveCallbacks = [] // 存储成功的回调
    this.onRejectedCallbacks = []
    let resolve = (value) => {
      console.log(value, '123')
      if (this.status === PENDING){
        this.status = RESOLVED
        this.value = value
        this.onResolveCallbacks.forEach(fn => fn(this.value))
      }
      
    }
    let reject = (reason) => {
      if (this.status === PENDING){
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

  then(onFulFilled,onRejected){
    if (this.status === RESOLVED){
      onFulFilled(this.value)
    }
    if (this.status === REJECTED){
      onRejected(this.reason)
    }
    if (this.status === PENDING){
      this.onResolveCallbacks.push(()=>{
        onFulFilled(this.value)
      })
      this.onRejectedCallbacks.push(()=>{
        onRejected(this.reason)
      })
    }
  }
}
/*
let p = new Promise((resolve,reject)=>{
  console.log(1)
  resolve('hello')
})

p.then((res)=>{
  console.log(res)
},(err)=>{
  console.log(err)
})
// 运行结果：1 hello
// 改造
*/
let p = new Promise((resolve,reject)=>{
  console.log(1)
  // resolve('hello')
  setTimeout(() => {
    resolve('hello')
  }, 1000);
})
p.then((res)=>{
  console.log(res)
},()=>{

})
console.log(2)
// 运行结果： 1 
/*
因为在executor 执行的时候setTimeout异步，这个时候状态还是pending，
在我们实现的Promise类中的then方法中没有处理pending。
*/
