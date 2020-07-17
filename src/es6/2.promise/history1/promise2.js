
/*
 * @Author: shouxie
 * @Date: 2020-07-10 16:25:43
 * @Description: 
 */ 
// 实现then 链式调用
const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REHECTED = 'REHECTED'
class Promise {
  constructor(executor){
    this.status = PENDING
    this.reason = ''
    this.value = ''
    this.onFilfulledCallbacks = []
    this.onRejectedCallbacks = []

    let resolve = (value)=>{
      if (this.status === PENDING){
        this.status = RESOLVED
        this.value = value
        this.onFilfulledCallbacks.forEach(fn => fn(value))
      }
    }
    let reject = (reason) =>{
      if (this.status === PENDING){
        this.status = REHECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn(reason))
      }
    }
    try {
      executor(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFilfulled,onRejected){
    let promise2 = new Promise((resolve,reject)=>{
        if(this.status === RESOLVED){
         setTimeout(() => {
          try {
            let x = onFilfulled(this.value) // p1执行返回的结果x
            resolveFunction(promise2,x,resolve,reject)
          } catch (error) {
            reject(error)
          }
         }, 0);
        }
        if (this.status === REHECTED){
          setTimeout(()=>{
            try {
              let x = onRejected(this.reason)
              resolveFunction(promise2,x,resolve,reject)
            } catch (error) {
              reject(error)
            }
          },0)
        }
        if (this.status === PENDING){
          this.onFilfulledCallbacks.push(()=>{
            setTimeout(() => {
              try {
                let x = onFilfulled(this.value)
                resolveFunction(promise2,x,resolve,reject)
              } catch (error) {
                reject(error)
              }
            }, 0);
          })
          this.onRejectedCallbacks.push(()=>{
            setTimeout(() => {
              try {
                let x = onRejected(this.reason)
                resolveFunction(promise2,x,resolve,reject)
              } catch (error) {
                reject(error)
              }
            }, 0);
          })
        }
    })
    return promise2
  }
}
function resolveFunction(promise2,x,resolve,reject){
  if (promise2 === x){
    return reject(new TypeError('error'))
  } else {
    if (typeof x === 'object' && typeof x !== 'null' || typeof x === 'function'){
      // 默认认为x是promise
      let then = x.then
      then.call(x,(y)=>{
        // resolve(y)
        resolveFunction(promise2,y,resolve,reject)
      },(r)=>{
        reject(r)
      })
    } else {
      return resolve(x)
    }
  }
}

let p = new Promise((resolve,reject)=>{
  setTimeout(() => {
    resolve(1)
  }, 0);
})
p.then((res)=>{
  console.log(res)
})