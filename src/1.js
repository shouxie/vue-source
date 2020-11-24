const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECT = 'REJECT'
class Promise {
  constructor(executor){
    this.value = ''
    this.reason = ''
    this.status = PENDING
    let resolve = (value)=>{
      this.value = value;
      this.status = RESOLVED
    }
    let reject = (reason)=>{
      this.reason = reason;
      this.status = REJECT
    }
    try {
      executor(resolve,reject);
    } catch (error) {
      reject(error)
    }
  }
  then(onfulfilled,onrejected){
    if(this.status === RESOLVED){
      onfulfilled(this.value)
    }
    if(this.status === REJECT){
      onrejected(this.reason)
    }
    if(this.status === PENDING){
      
    }
  }
}



new Promise((resolve,reject)=>{
  resolve(100)
}).then(()=>{},()=>{})