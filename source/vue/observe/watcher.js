/*
 * @Author: shouxie
 * @Date: 2020-06-30 16:50:55
 * @Description:  渲染
 */ 
let id = 0;
import {pushTarget, popTarget} from './dep'
import { util } from '../util';
class Watcher { // 每次产生一个watcher都要有一个唯一的标识
  /**
   * @description: 
   * @param {type}  vm 当前组件的实例 new Vue
   * @param {type} exprOrFn 用户可能传入的是一个表达式，也有可能传入一个函数
   * @param {type} cb 用户掺入的回调函数 vm.$watch('msg',cb)
   * @param {type} opts 一些其他参数
   * @return: 
   */


   // vm msg (newVal,oldVal) => {} {user:true}
   // vm  ()=>{this.firstName+this.lastName} lazy:true
  constructor(vm, exprOrFn, cb=() =>{}, opts={}) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn; // getter 就是new Watcher 传入的第二个函数
    } else{
      this.getter = function() { // 如果调用此方法，会将vm上对应的表达式取出来 vm.msg: hello1 得到的是hello1
        return util.getValue(vm,exprOrFn)
      }
    }
    if (opts.user) { // 标识是用户自己写的watch
      this.user = true;
    }
    this.lazy = opts.lazy // 如果这个值为true 说明他是计算属性
    this.dirty = this.lazy;
    console.log(this.getter(),exprOrFn,cb)
    this.cb = cb;
    this.depsId = new Set()
    this.opts = opts;
    this.id = id++;
    this.immediate = opts.immediate
    this.deps = []
    // 创建watcher的时候，先将表达式对应的值取出来，老值
    // 如果当前我们是计算属性的话 不会默认调用get方法
    this.value = this.lazy ? undefined : this.get() // 默认创建一个watcher 会调用自身的get方法
    if (this.immediate) { // 如果有immediate 就直接运行用户定义的函数
      this.cb(this.value)
    }
  }

  get() {
    // 默认创建watcher会执行此方法
    // Dep.target = 用户的watcher
    pushTarget(this) // 渲染watcher Dep.target = watcher msg变化了，需要让这个watcher重新执行
    
    // fullName(){return this.firstName + this.lasetName}
    // dep = [watcher] dep = wtacher
    // 函数调用时就会将计算属性watcher 存起来
    let value = this.getter.call(this.vm) // 让这个当前传入的函数执行
    popTarget()
    // if (this.immediate) {
    //   this.cb(value,this.value)
    // }
    return value
  }

  evalute() {
    this.value = this.get()
    this.dirty = false; // 值求过了，下次渲染时候不用求了
  }

  update() { // 如果立即调用get，会导致页面刷新 需要异步来更新
    console.log(this.id)
    if (this.lazy) { // 如果时计算属性
      this.dirty = true // 计算属性依赖的值变化了 稍后取值时重新计算下
    } else {
      queueWatcher(this)
    }
    
    // this.get()
  }

  run() {
    let value = this.get() // 新值
    if (this.value !== value) {
      this.cb(value,this.value)
    }
  }

  addDep(dep) { // 同一个watcher 不应该重复记录dep 让watcher和dep互相依赖
    let id = dep.id; // msg 的 dep
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep); // 就让watcher记住了当前的dep
      dep.addSub(this);
    }
  }

  depend(){
    let i = this.deps.length;
    console.log(i)
    while(i--){
      this.deps[i].depend()
    }
  }
}

let has = {};
let queue = []
function flushQueue() {
  // 等待当前这一轮全部更新后，再让watcher 依次执行
  queue.forEach(watcher => watcher.run())
  has = {} // 恢复正常，下一轮更新时继续使用
  queue = []
}
function queueWatcher(watcher) { // 对重复的watcher进行过滤操作
  let id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    queue.push(watcher) // 相同的watcher只会存一个到queue中

    // 延迟清空队列
    nextTick(flushQueue)
    // setTimeout(flushQueue,0) // 异步方法会等待所有同步方法执行完毕后调用此方法
  }
  

}

/*
setTimeout(() => {
  vm.msg = 'world' 
  vm.msg = 'world1'
  vm.msg = 'world2'
  vm.school.name = 'world2'
  vm.msg = 'world3'
},1000)
执行过程：
如果不异步处理，
重新赋值一次会调用set，set一次就更新一次update
现在做法是：
把相同watcher放到一个队列中，放进去之后先不执行，setTimeout(flushQueue,0)，每赋值一次set一次，先不执行，直到所有的都set之后，再flushQueue，即更新视图
*/
let callbacks = []
function flushCallbacks() {
  callbacks.forEach(cb => cb())
}
function nextTick(cb) { // cb这里默认就是flushQueue，用户如果也调用nextTick，吧用户的回调函数也放进那个回调队列
  callbacks.push(cb)

  // 要异步刷新这个callbacks,获取一个异步的方法
  // 这里就是为了兼容和提高性能，如果浏览器不支持Promise，则走MutationObserver ...
  // 微任务promise，mutationObserver 宏任务setImmediate setTimeout
  // 异步是分执行顺序的，会先执行（promise，mutationObserver） setImmediate setTimeout
  let timerFunc = () => {
    flushCallbacks()
  }
  if (Promise) { // then方法是异步的
    return Promise.resolve().then(timerFunc)
  }
  if (MutationObserver) { // MutationObserver 也是一个异步方法
    let observe = new MutationObserver(timerFunc) // h5的api
    let textNode = document.createTextNode(1)
    observe.observe(textNode,{characterData: true})
    textNode.textContent = 2
    return
  }
  if (setImmediate) {
    return setImmediate(timerFunc)
  }
  setTimeout(timerFunc,0)

}
// 等待页面更新再去获取dom元素
// Vue.nextTick(() => {

// })

// 渲染使用，计算属性，vm.watch 都用到
export default Watcher