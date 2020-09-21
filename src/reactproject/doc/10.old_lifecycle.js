import React,{Component,createRef} from 'react'
import ReactDom from 'react-dom'
/*
  旧版生命周期
  1. 初始化 props state   constructor
  2. mounting  componentWillMount render componentDidMount
  3. update   states ：shouldComponentUpdate  返回true  componentWillUpdate render componentDidUpdate
  3. update   props componentWillReceiveProps  ：shouldComponentUpdate  返回true  componentWillUpdate render componentDidUpdate
  
  unmounting  componentWillUnmount

constructor
componentWillMount
render
child componentWillMount
child render
child componentDidMount
componentDidMount


update：
shouldComponentUpdate
componentWillUpdate
render
child componentWillReceiveProps
child shouldComponentUpdate
child componentWillUpdate
child render
child componentDidUpdate
componentDidUpdate

*/
class Counter extends Component{
  static defaultProps ={
    name:'ad'
  }
  constructor(props){
    super(props)
    this.state = {number:0}
    console.log('1.constructor')
  }
  componentWillMount(){
    console.log('2.componentWillMount')
  }

  componentDidMount(){
    console.log('4.componentDidMount')
  }

  shouldComponentUpdate(nextProps,nextState){
    console.log('5.shouldComponentUpdate')
    return true  // 如果返回true会重新render，得到新的react元素
  }

  componentWillUpdate(){
    console.log('6.componentWillUpdate')
  }

  componentDidUpdate(){
    console.log('7.componentDidUpdate')
  }

  componentWillUnmount(){
    console.log('8.componentWillUnmount')
  }

  handleClick=() =>{
    this.setState({
      number:this.state.number+1
    })
  }

  render(){
    //react组件实例中的 渲染 指的是调用render方法，然后得到一个react元素
    console.log('3.render')
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
        <hr/>
        <ChildCounter number={this.state.number}/>
      </div>
    )
  }
}

class ChildCounter extends Component{

  componentWillMount(){
    console.log('ChildCounter componentWillMount')
  }

  componentDidMount(){
    console.log('ChildCounter componentDidMount')
  }


  componentWillReceiveProps(nextProps){
    console.log('ChildCounter componentWillReceiveProps')
  }
  shouldComponentUpdate(nextProps,nextState){
    console.log('ChildCounter shouldComponentUpdate')
    return true 
  }
  componentWillUpdate(){
    console.log('ChildCounter componentWillUpdate')
  }

  componentDidUpdate(){
    console.log('ChildCounter componentDidUpdate')
  }
  componentWillUnmount(){
    console.log('ChildCounter componentWillUnmount')
  }

  render(){
    console.log('ChildCounter render')
    return (
      <div>{this.props.number}</div>
    )
  }
}


ReactDom.render(<Counter/>,document.getElementById('root'))
