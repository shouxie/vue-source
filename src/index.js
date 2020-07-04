/*
 * @Author: shouxie
 * @Date: 2020-06-29 16:29:44
 * @Description: 
 */ 
import Vue from 'vue' // 会默认查找source目录下的vue文件夹
// 类 es6 构造函数 es5

let vm = new Vue({
  el: '#app', // 表示要渲染的元素是app
  data() {
    return {
      msg: 'hello11',
      school: {name: 'zf', age: 10},
      arr: [12,3,4],
      arr1: [{a:1},2,3],
      arr2: [['hello'],2,3],
      firstName: 'qiao',
      lastName: 'pan'
    }
  },
  computed: {
    fullName() {
      return this.firstName + this.lastName
    }
  },
  watch: {
    // msg(newVal,oldVal) {
    //   console.log(newVal,oldVal)
    // }
    msg: {
      handler(newVal,val){
        console.log(newVal,val, '123')
      },
      immediate: true
    }
  }
});
// 希望：vm.msg = vm_data.msg // 代理
// console.log(vm, 'src/index', vm.msg);
// vm.msg = 10
// console.log('src/index1', vm.msg);

// vm.arr.push(4)
// 对原生的方法进行劫持
// console.log('vm.arr', vm.arr.push(4), vm.arr)

// 如果新增的属性也是对象类型，我们需要对这个对象，也进行观察，observe
// console.log('vm.arr', vm.arr.push({a:1}), vm.arr[3].a)
// console.log(vm.arr1[0]['a'] = 100)

setTimeout(() => {
  // vm.msg = 'world' // [dep] = [渲染watcher]
  // vm.msg = 'world1'
  // vm.msg = 'world2'
  // vm.school.name = 'world2'// [dep] = [渲染watcher]
  // vm.msg = 'world3' // 最终就拿 vm.msg = 'world3'更新就行，不需要更新4次
  // vue 的特点就是批量更新，防止重复渲染
  // console.log(vm)
  // vm.arr2[0].push(100)
  // vm.arr.push(123) // 更改数组中对象的属性是可以的，因为我们拦截了对象的get和set
  //----------watch的使用
  // vm.msg = 'world1'
  // ----------computed的使用
  vm.firstName = 'hello' // firstName [watcher 计算属性watcher 渲染watcher]
},1000)

/**
 * 什么样的数组会被观测。
 * vue中没有直接对数组的每一项进行检测，因为消耗性能太大
 * 只是劫持里数组的原型上的方法，对其进行改写
 * 
 * [0,2,3] observe 不能直接改变索引 不能被检测到
 * [0,2,3].length 因为数组的长度变化，我们没有监控
 * 
 * [{a:1}] 内部会对数组里的对象进行监控
 * [].push shift unshift 这些方法可以被监控 vm.$set 调用的就是数组的splice
 */

