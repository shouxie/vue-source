import React,{Component} from 'react'
import ReactDom from 'react-dom'


/*
为了提升性能，react可能会吧setState更新搞成异步
有些时候不能在setState 立刻从this.state 获取最新的值
如果想用老得值计算新的值的话，必须用函数来更新，函数参数可以获取到老得状态
this.setState(state => (number:state.number+1))


默认在事件函数里处于批量更新模式 batchUpdate，此种模式下状态不好立刻更新，而是缓存起来，
放到一个队列里，等事件处理函数完成后才执行更新

如果写在setTimeOut里面的话，可以立刻更新

state的更新可能会被合并
*/
class Counter extends Component{
  constructor(props){
    super(props)
    this.state = {
      number:0
    }
  }
  /*
  event 并不是原生dom事件 而是react自己封装后的事件对象，而且为了提高性能 
  当此处理函数 执行完后就回收了给别的地方用了
  */ 

  handleClick = (event)=>{
    // 在事件处理函数执行前把isBatchingUpdate=true
    /*this.setState({
      number:this.state.number+1
    })
    this.setState({
      number:this.state.number+1
    })
    this.setState({
      number:this.state.number+1
    })*/
    setTimeout(()=>{
      this.setState(state=>({number:state.number+1}))
      console.log(this.state)
    },10)
    //// 在事件处理函数执行后把isBatchingUpdate=false，并且更新组件
  }
  render(){
    return (
      <div>
        <h1>hello</h1>
        <h2>{this.state.number}</h2>
        <div onClick={this.handleClick}>+</div>
      </div>
    )
  }
}

ReactDom.render(<Counter/>,document.getElementById('root'))
