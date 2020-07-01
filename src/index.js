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
      arr1: [{a:1},2,3]
    }
  },
  computed: {},
  watch: {}
});
// 希望：vm.msg = vm_data.msg // 代理
// console.log(vm, 'src/index', vm.msg);
// vm.msg = 10
// console.log('src/index1', vm.msg);

// vm.arr.push(4)
// 对原生的方法进行劫持
// console.log('vm.arr', vm.arr.push(4), vm.arr)

// 如果新增的属性也是对象类型，我们需要对这个对象，也进行观察，observe
console.log('vm.arr', vm.arr.push({a:1}), vm.arr[3].a)
console.log(vm.arr1[0]['a'] = 100)

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

