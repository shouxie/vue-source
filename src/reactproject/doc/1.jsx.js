import React from 'react'
import ReactDom from 'react-dom'

// jsx语法
ReactDom.render(<h1>hello</h1>,document.getElementById('root'))

/*
react 核心库
react-dom react-native  react-canvas



jsx语法 是一个语法糖 最终会通过babel转译成createElement语法
react元素是构成react应用的最小单位
react元素是用来描述你在屏幕上看到的东西
react事实上是普通的js对象，reactdom来确保浏览器中的dom数据和react元素保持一致
react元素既可以作为方法的参数 也可以作为方法的返回值
react元素 类似认为是一个不可变对象 一旦创建 就不能再修改了

jsx表达式 {} 包起来的 表达式一般是由变量和运算符组成一个式子 他会经过计算并返回一个值

className 
style 对象 驼峰

react更新的时候非常高效  会自动进行比对 然后只会更新必要的变更部分
*/