/*
 * @Author: shouxie
 * @Date: 2020-06-29 17:37:00
 * @Description: 
 */ 
import {observe} from './index'
import {arrayMethods, observerArray} from './array'
import Dep from './dep'
export function defineReactive(data, key, value) {
  // 定义响应式的数据变化
  // vue 不支持ie8及ie8下的浏览器

  // 如果value 依旧是一个对象的话，需要深度观察 {msg: 'hello'}
  observe(value)
  // 每一个属性都增加一个dep实例，相同的属性用的是相同的dep
  let dep = new Dep() // dep可以手机依赖，收集的是watcher
  Object.defineProperty(data, key, {
    get() { // 只要对这个属性进行了取值操作，就会将当前的watcher存进去
      debugger
      if (Dep.target) { // 这次有值用的是渲染watcher
        // 我们希望存入的watcher不能重复，如果重复会造成更新时多次渲染
        // dep.addSub(Dep.target)
        dep.depend() // 想让dep中可以存watcher，还希望让watcher也存放dep，实现多对多的关系
      }
      console.log('获取数据')
      return value;
    },
    set(newValue) {
      console.log('设置数据')
      if (newValue === value) return;
      observe(newValue) // 如果设置的值是一个对象的话，应该再进行监控这个新增的值
      value = newValue
      dep.notify()
    }
  })
}
class Observer {
  constructor(data) { // data 就是刚才定义的vm._data
    // 将用户的数据使用definePrototype重新定义

    if (Array.isArray(data)){ // 需要重写push方法等
      // 只能拦截数组的方法，数组的每一项还需要去观测一下
      data.__proto__ = arrayMethods; // 让数组通过链来查找我们自己编写的原型
      observerArray(data); // 观测数据中的每一项
    } else {
      this.walk(data);
    }

    // console.log('observer', data)
  }
  walk(data){
    let keys = Object.keys(data);
    // console.log(keys)
    for (let i = 0; i< keys.length;i++){
      let key = keys[i]; // 用户传入的key
      let value = data[keys[i]] // 用户传入的value
      // 对每个属性都进行重新用defineReactive
      defineReactive(data, key, value);
    }
  }
}
export default Observer