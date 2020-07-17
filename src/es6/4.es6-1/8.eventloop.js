/*
 * @Author: shouxie
 * @Date: 2020-07-17 15:54:32
 * @Description: 
 */ 
/*
默认会先执行当前脚本 先把脚本执行完毕后 取出所有的微任务进行处理，处理完毕后，从宏任务 获取第一个任务执行，第一个执行完毕，会再次清空微任务 再一次去取宏任务
*/

/*
微任务： promise.then MutationObserver process.nextTick 
宏任务： script ，ajax ，事件 ， setTimeout， setInterval ，setImmediate ，（I/O） ，UI rendering，MessageChannel，requestFrameAnimation
*/


/*
Vue.nextTick() 延迟执行某个函数（异步api。可以等待同步代码都执行完毕后，再去执行这里的回调）

vue特点：异步更新数据，会在当前代码执行完毕后，把更新（异步）操作 放到队列中
[更新，fn，fn...]
vue： 降级兼容处理：promise  MutationObserver  setImmediate setTimeout



*/