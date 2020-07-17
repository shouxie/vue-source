/*
 * @Author: shouxie
 * @Date: 2020-07-16 15:28:09
 * @Description: 
 */ 
/*
export import
export default 和 export 区别
es6 动态导入 import()

模块：多个模块之间相互独立 解决变量冲突问题 单例模式
    方便维护

esmodule  静态导入  最外层作用域下使用
node模块   动态导入



核心就是   把当前的内容放到一个函数 

es6中每个文件就是一个模块
export 语法默认不能导出一个具体的内容
1. 我们可以一一列举获取
2. 可以用* as
3. 给接口取别名
4. 可以每次通过接口名 获取最新接口对应的值
 import 才有声明的功能 而且有变量提升的功能

vue 代码出了入口文件 其他的都是export xxx 

import {} from 
import * as obj from
import {str as str1} from 

export default xxx
export {
  str1,
  str2 as default // 导出的时候重命名 相当于export default str2
}
import * as obj from // obj.default 就是xxx 等价于 默认把结果放到default属性上

export 导出的是一个接口 export defalt 导出的是一个具体的值

export {xxx} / import {xxx} from ''   import * as obj from ''
export default / import xxx from ''  import {default as xxx} from ''

草案语法 可以写到代码块中
if (true){
  import(‘./’).then((data)=>{
    console.log(data.default)
  }) // import() 是返回的promise 动态导入某个文件
}



es5 中的类和类的继承
new.target
属性访问器
静态方法和静态属性
装饰器


数组reduce用法 compose函数
箭头函数的使用
*/