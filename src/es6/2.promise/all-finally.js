

/*
 * @Author: shouxie
 * @Date: 2020-07-13 15:01:20
 * @Description: 
 */ 
/*
finally es9  只能在高版本node中使用
*/

Promise.prototype.finally = function(callback){
  // finally 就是一个then方法
  return this.then((data)=>{
    // 调用promise.resolve 确保callback中的promise执行完成
    return Promise.resolve(callback()).then(()=>data)
  },(err)=>{
    return Promise.resolve(callback()).then(()=>{throw err})
  })

}
// 如果finally 返回一个promise 那么会等待这个promise执行完成
Promise.resolve(100).finally(()=>{
  console.log('ok')
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
        resolve('123')
    }, 5000);
  })
}).then(data =>{
  console.log('data',data)
}).catch((err)=>{
  console.log('err',err)
})

// promise.all 全部成功才成功，如果有任何一个失败了就会执行失败的逻辑 promise.race
const isPromise = (value) => {
  return typeof value.then === 'function'
}

// race 赛跑，谁最快就用谁的结果，可以做promise中断处理

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