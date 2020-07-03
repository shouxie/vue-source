
/*
 * @Author: shouxie
 * @Date: 2020-06-29 17:09:16
 * @Description: t 
 */ 
import Observer from './observer';

export function initState(vm){
  // console.log('initstate');
  // 做不同的初始化工作
  let opts = vm.$options;
  if (opts.data) {
    initData(vm); // 初始化数据
  }
  if (opts.computed) {
    initComputed(); // 初始化计算属性
  }
  if (opts.watch) {
    initWatch(vm); // 初始化watch
  }
}
export function observe(data) {
  if (typeof data !== 'object' || data == null) {
    return // 不是对象或者是null 不用执行后续逻辑
  }
  if (data.__ob__) { // 已经被监控过了
    return data.__ob__
  }
  // console.log(data, 'data')
  return new Observer(data)
}

function proxy(vm, source, key) { // 代理数据 vm.msg = vm_data.msg
  Object.defineProperty(vm, key, {
      get() {
        return vm[source][key]
      },
      set(newValue) {
        vm[source][key] = newValue
      }
  })
}

function initData(vm){ // 将用户传入的数据，通过object.definePrototype 重新定义
  let data = vm.$options.data; // 用户传入的data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
  
  for (let key in data) {
    proxy(vm, '_data', key) // 将对vm上的取值操作代理到vm._data 属性
  }
  observe(vm._data); // 观察数据
}

function initComputed() {

}
function createWatcher(vm,key,handler) {
  // 内部最终也会使用$watch方法
  return vm.$watch(key,handler)
}
function initWatch(vm) {
  let watch = vm.$options.watch // 获取用户传入的watch
  for(let key in watch) { // msg() {} msg:[(){},(){}(){}]
    let handler = watch[key];
    createWatcher(vm,key,handler)
  }
}