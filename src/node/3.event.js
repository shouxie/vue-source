/*
 * @Author: shouxie
 * @Date: 2020-07-21 17:27:51
 * @Description: 
 */ 
/*
node 核心： 异步非阻塞  监听，异步完成之后去处理

发布订阅模式 先做好监听 异步成功后通知
*/
let util = require('util') // promisify inherits 判断类型util.types等


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


let EventEmmitter = require('events');
// on emit off once newListener   removeListener(老版本，新版本是off)
// util.promisify()
util.inherits(P,EventEmmitter) // 实现继承公共属性
function P(){

}
let p = new P()
// 每次调用on方法的时候就会触发此函数
p.on('newListener',function(type){
  // console.log(type)
  process.nextTick(()=>{
    p.emit(type)
  })
  
})
p.on('ev1',function(who){ // 第一次绑定的时候 触发了newListener
  console.log('ev1'+who)
})

p.on('ev1',function(who){
  console.log('ev11'+who)
})

let listener = function(who){
  console.log('ev12'+who)
}
p.on('ev1',listener)


p.off('ev1',listener)
p.emit('ev1', 'name')


p.once('ev2',function(who){ 
  console.log('ev2'+who)
})

p.once('ev2',function(who){
  console.log('ev22'+who)
})
p.on('newListener',function(type){
  // console.log(type)
  process.nextTick(()=>{
    p.emit(type)
  })
  
})