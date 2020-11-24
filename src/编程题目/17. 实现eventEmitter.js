class EventEmitter{
  constructor(){
    this.events={};
  }
  on(name,cb){
    if(this.events[name]){
      this.events[name].push(cb);
    }else{
      this.events[name]=[cb];
    }
  }
  emit(name,...args){
    if(this.events[name]){
      this.events[name].forEach((fn)=>{
        fn.call(this,...args);
      });
    }
  }
  off(name,callback){
    this.events[name] = this.events[name].filter(fn=>fn!==callback)
  }
  once(name,fn){
    const one = (...args)=>{
      fn(...args);
      this.off(name,one);
    }
    this.on(name,one)
  }
}







function EventEmmitter1 (){
  this._events = Object.create(null);
}
EventEmmitter1.prototype.on = function(eventName,callback){
  // 默认先去已经订阅好的结果中拿到callbacks 如果没有 默认是[]
  if (!this._events) this._events = Object.create(null)

  // eventName newListener
    /*
    只要绑定了名字就需要找newListener中对应的方法依次执行
    */
  this.emit('newListener',eventName) // 如果绑定了事件，就触发一些newListener方法

  let callbacks = this._events[eventName] || [];
  callbacks.push(callback) // 把当前的callback放到数组中
  this._events[eventName] = callbacks
}
EventEmmitter1.prototype.emit = function(eventName,...args){
  let callbacks = this._events[eventName] || [];
  callbacks.forEach(fn => {
    fn(...args)
  });
}
EventEmmitter1.prototype.off = function(eventName,callback){
  let callbacks = this._events[eventName] || [];
  this._events[eventName] = callbacks.filter((cb)=>{
    return cb !== callback && cb.callback !== callback
  })
  // let index = callbacks.indexOf(callback)
  // callbacks.splice(index,1)
}
EventEmmitter1.prototype.once = function(eventName,callback){
  const one = (...args)=>{
    callback(...args) // 执行原函数
    this.off(eventName,one) // 关闭one事件
  }
  one.callback = callback // 自定义事件
  this.on(eventName,one) // 先绑定
}




class EventEmitter {
  constructor(){
    this.events = {};
  }
  on(eventName,callback){
    if(!this.events) {
      this.events = Object.create(null);
    }
    let calls = this.events[eventName] || [];
    calls.push(callback);
    this.events[eventName] = calls;
  }
  emit(eventName,...args){
    this.events[eventName].forEach(fn=>{
      fn.call(this,...args);
    })
  }
  off(eventName,callback){
    this.events[eventName] = this.events[eventName].filter(fn => fn !== callback);
  }
  once(name,fn){
    const one = (...args) =>{
      fn(...args);
      this.off(name,one);
    }
    this.on(name,one);
  }


  once(name,callback){
    const one = (...args) =>{
      callback(...args);
      this.off(name,one);
    }
    this.on(name,one)
  }
}