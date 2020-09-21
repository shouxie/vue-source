import React,{Component} from 'react'
import ReactDom from 'react-dom'



/*
react
组件 它的数据有两个来源 一个是props外界给的，另一个是state，是内部产生的数据
属性和状态的改变都会影响视图
初始化状态有两种办法：第一种：this.state = {}
第二种是


每次setState 都会引起render的变化 即使状态没有发生变化，组件都会刷新
但它会走一个dom diff

优化 shouldComponentUpdate


1. 不要直接修改state，只能在构造函数初始化的时候给this.state赋值，其他地方只能调setState
2. setState 状态更新可能是异步的
*/
class Clock extends Component{
  constructor(props){
    super(props)
    this.state = {
      date:new Data()
    }
  }

  shouldComponentUpdate(nextProps,nextState){
    // return false // 不更新
    return this.state !== nextState
  }

  // 组件将要卸载的时候 清除定时器
  componentWillUnmount(){
    clearInterval(this.timer)
  }

  // 当组件挂载完成后会调用此生命周期函数
  componentDidMount(){
    this.timer = setInterval(()=>this.tick,1000)
  }
  tick = ()=>{
    this.setState({
      date:new Date()
    })
  }
  render(){
    return (
      <div>
        <h1>hello</h1>
        <h2>当前时间{this.state.date.toLocaleString()}</h2>
      </div>
    )
  }
}

ReactDom.render(<Clock/>,document.getElementById('root'))
