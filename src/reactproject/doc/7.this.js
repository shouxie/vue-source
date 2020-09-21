import React,{Component} from 'react'
import ReactDom from 'react-dom'


/*
this 我们如果想拿到正确的this
1. 箭头函数
2. 匿名函数 onClick={() =>this.handleClick()}
3. bind
*/
class Counter extends Component{
  constructor(props){
    super(props)
    this.state = {
      number:0
    }
  }
 

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
