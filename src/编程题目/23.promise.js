const { reject } = require("../es6/2.promise/promise")

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
class Promise{
  constructor(executor){
    this.value = ''
    this.reason = ''
    this.status = PENDING
    this.onResolveCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = (value) => { // value 有可能是个promise
      if (value instanceof Promise){
        return value.then(resolve,reject)
      }
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

  catch(errCallback){ // 没有传入成功的then方法就是catch的原理
    return this.then(null,errCallback)
  }
}
// 如果里面传入的值是promise 会等待这个promise执行完成
Promise.resolve = function(value){
  return new Promise((resolve,reject)=>{
      resolve(value)
  })
}

// 直接将原因向下抛出， 没有等待的效果
Promise.reject = function(reason){
  return new Promise((resolve,reject)=>{
      reject(reason)
  })
}


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

Promise.prototype.finally = function(callback){
  // finally 就是一个then方法
  return this.then((data)=>{
    // 调用promise.resolve 确保callback中的promise执行完成
    return Promise.resolve(callback()).then(()=>data)
  },(err)=>{
    return Promise.resolve(callback()).then(()=>{throw err})
  })

}

// race 赛跑，谁最快就用谁的结果，可以做promise中断处理
const isPromise = (value) => {
  return typeof value.then === 'function'
}
Promise.all = function(promises){
  return new Promise((resolve,reject)=>{
      let resultArr = []
      let idx = 0
      const processData =(data,index) =>{
        resultArr[index] = data
        if (++idx === promises.length){
          resolve(resultArr)
        }
      }
      for (let i =0;i<promises.length;i++){
        let currentVal = promises[i]
        if (isPromise(currentVal)){
          currentVal.then(data=>{
            processData(data,i)
          },reject)
        } else {
          processData(currentVal,i)
        }
      }
  })
}

const _race = (p)=>{
	return new Promise((resolve, reject)=>{
		p.forEach((item)=>{
			Promise.resolve(item).then(resolve, reject)
		})
	})
}

const isPromise = (value) =>{
  return typeof value.then === 'function';
}
Promise.all = function(promises){
  let idx = 0,
      res = [];
  const handle = (data,index)=>{
    res[index] = data;
    if(++idx===promises.length){
      this.resolve(res);
    }
  }
  for(let i=0;i<promises.length;i++){
    let cur = promises[i];
    if(isPromise(cur)){
      cur.then((data)=>{
        handle(data,i);
      });
    }else{
      handle(cur,i);
    }
  }

}

Promise.all=function(promises){
  let res=[],
      idx = 0;
  const handle = (data,index)=>{
    res[index] = data;
    if(++idx===promises.length){
      this.resolve(res);
    }
  }
  for(let i=0;i<promises.length;i++){
    let cur = promises[i];
    if(isPromise(cur)){
      cur.then((data)=>{
        handle(data,i);
      })
    }else{
      handle(cur,i);
    }
  }
}


const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECT = 'reject';
function resolvePromise(promise2,x,resolve,reject){
  if(promise2 === x) {
    return reject(new Error('type error'))
  }
  if(typeof x == 'object' && x !== null || typeof x !== 'function'){
    let then = x.then;
    if(typeof then === 'function'){
      then.call(x,(y)=>{
        resolvePromise(promise2,y,resolve,reject)
      },(r)=>{
        reject(r)
      })
    }else{
      resolve(x);
    }
    
  }else{
    resolve(x);
  }
}
class Promise{
  constructor(executor){
    this.status = PENDING;
    this.value = '';
    this.reason = '';
    this.onresolvedcallbacks=[];
    this.onrejectcallbacks=[];
    let resolve = (value) =>{
      this.status = RESOLVED;
      this.value = value;
      this.onresolvedcallbacks.forEach(fn => fn());
    }
    let reject = (reason) =>{
      
    }
    try {
      executor(resolve,reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onfulfilled,onRejected){
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : v=> v;
    let promise2 = new Promise((resolve,reject)=>{
      if(this.status === RESOLVED){
        let x = onfulfilled(this.value)
      }
      if(this.status === REJECT){}
      if(this.status === PENDING){
        this.onResolveCallbacks.push(()=>{
          let x = onfulfilled(this.value);
          //
        })
      }
    })
  }
}





function fn(promise2,x,resolve,reject){
  if(promise2 === x) {
    return reject(new Error('typeerror'))
  }
  if(typeof x === 'object' && x !== null || typeof x !== 'function'){
    let then = x.then;
    if(typeof then === 'function'){
      then.call(x,(y)=>{
        fn(promise2,y,resolve,reject)
      },(r)=>{
        reject(r)
      })
    }else{
      resolve(x);
    }
  }else{
    
  }
}
class Promise{
  constructor(executor){
    this.value = '';
    this.reason = '';
    this.onresolvedcallbacks = [];
    this.onrejectcallbacks = [];
    this.status = PENDING;
    let resolve = (value) =>{
      this.value = value;
      this.status = RESOLVED;
      this.onresolvedcallbacks.forEach(fn => fn())
    }
    try {
      executor(resolve,reject)
    } catch (error) {
        reject(error)
    }
  }
  then(onfulfilled,onreject){
    let promise2 = new Promise((resolve,reject)=>{
      if(this.status === RESOLVED){
        let x = onfulfilled(this.value);
        fn(promise2,x,resolve,reject)

      }
      if(this.status === REJECT){
        let x = onreject(this.reason);
        fn(promise2,x,resolve,reject)
      }
      if(this.status === PENDING){
        this.onresolvedcallbacks.push(()=>{
          setTimeout(() => {
            let x = onfulfilled(this.value);
            fn(promise2,x,resolve,reject)
          });
        })
        this.onrejectcallbacks.push(()=>{
          setTimeout(() => {
            let x = onreject(this.value);
            fn(promise2,x,resolve,reject)
          });
        })
      }
    });
    return promise2;
  }
}