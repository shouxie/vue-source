/*
 * @Author: shouxie
 * @Date: 2020-06-30 16:50:55
 * @Description:  渲染
 */ 
let id = 0;
import {pushTarget, popTarget} from './dep'
class Watcher { // 每次产生一个watcher都要有一个唯一的标识
  /**
   * @description: 
   * @param {type}  vm 当前组件的实例 new Vue
   * @param {type} exprOrFn 用户可能传入的是一个表达式，也有可能传入一个函数
   * @param {type} cb 用户掺入的回调函数 vm.$watch('msg',cb)
   * @param {type} opts 一些其他参数
   * @return: 
   */
  constructor(vm, exprOrFn, cb=() =>{}, opts={}) {
    this.vm = vm;
    this.exprOrFn = exprOrFn;
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn; // getter 就是new Watcher 传入的第二个函数
    }
    this.cb = cb;
    this.depsId = new Set()
    this.opts = opts;
    this.id = id++;
    this.deps = []
    this.get() // 默认创建一个watcher 会调用自身的get方法
  }

  get() {
    // 默认创建watcher会执行此方法
    pushTarget(this) // 渲染watcher Dep.target = watcher msg变化了，需要让这个watcher重新执行
    this.getter() // 让这个当前传入的函数执行
    popTarget()
  }

  update() {
    this.get()
  }

  addDep(dep) { // 同一个watcher 不应该重复记录dep 让watcher和dep互相依赖
    let id = dep.id; // msg 的 dep
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep); // 就让watcher记住了当前的dep
      dep.addSub(this);
    }
  }
}
// 渲染使用，计算属性，vm.watch 都用到
export default Watcher