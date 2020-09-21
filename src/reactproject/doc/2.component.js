import React from 'react'
import ReactDom from 'react-dom'

// jsx语法
ReactDom.render(<h1>hello</h1>,document.getElementById('root'))
/*
组件：
类似于一个函数 接收属性作为参数 返回react元素

函数组件 props是属性名 是一个对象 返回一个react元素
类组件  
react组件 首字母 必须大写
组件的返回值有且只能有一个根元素
*/
function Welcome(props){
  return <h1>{props.name}</h1>
}

class Welcome extends React.Component{
  constructor(props){
    super(props)

  }

  render(){
    return <h1>{this.props.name}</h1>
  }
}

let props = {name:'',age:10}
let w = new Welcome(props)
let ele1 = w.render()


let ele = Welcome(props)


ReactDom.render(<Welcome name='hello' age={10}/>,document.getElementById('root'))
ReactDom.render(ele,document.getElementById('root'))
