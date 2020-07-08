/*
 * @Author: shouxie
 * @Date: 2020-07-07 15:39:31
 * @Description: 
 */ 

 const PENDING = 'PENDING'
 const RESOLVEED = 'RESOLVEED'
 const REJECTED = 'REJECTED'
class Promise{
  constructor(executor){
      this.status = PENDING
      this.value = undefined // 成功的原因
      this.reason = undefined // 失败的原因
      this.onResolveCallbacks = [] // 存储成功的回调
      this.onRejectedCallbacks = []
      let resolve = (value)=>{ // 成功的函数
        if (this.status === PENDING){
          this.status = RESOLVEED
          this.value = value
          this.onResolveCallbacks.forEach(fn => fn())
        }
        
      }
      let reject = (reason) => { // 失败的函数
        if (this.status === PENDING){
          this.status = REJECTED // 改变状态
          this.reason = reason
          this.onRejectedCallbacks.forEach(fn => fn())
        }
        
      }
      try {
        executor(resolve,reject)
      } catch (error) {
        reject(e)
      }
      
  }

  then(onFulfilled,onRejected){
      if (this.status === RESOLVEED){
        onFulfilled(this.value)
      }
      if (this.status === REJECTED){
        onRejected(this.reason)
      }
      // 有可能 调用then的时候 当前promise 没有成功也没有失败
      if (this.status === PENDING){
        // 如果是等待状态 需要将onFulfilled 和 onRejected分别存放
        this.onResolveCallbacks.push(() => {
          // todo...
          onFulfilled(this.value) // AOP
        })
        this.onRejectedCallbacks.push(() => {
          onRejected(this.reason)
        })
      }
  }
}
module.exports = Promise //将Promise类暴露出去