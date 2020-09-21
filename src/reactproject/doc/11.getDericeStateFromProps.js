import React,{Component,createRef} from 'react'
import ReactDom from 'react-dom'
/*
新版生命周期
  1. 初始化 props state   constructor
  2. mounting ：  render componentDidMount
  3. update   states ： getDericeStateFromProps shouldComponentUpdate  返回true  render getSnapShotBeforeUpdate componentDidUpdate
  
  unmounting  componentWillUnmount


  getSnapShotBeforeUpdate： 被调用render之后，可以读取但无法使用dom的时候，它使得你的组件
  可以在可能更改之前从dom捕获一些信息（例如滚动位置），此生命周期返回的任何值都将作为参数
  传递给componentDidUpdate

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

  componentDidMount(){
    console.log('4.componentDidMount')
  }

  shouldComponentUpdate(nextProps,nextState){
    console.log('5.shouldComponentUpdate')
    return true  // 如果返回true会重新render，得到新的react元素
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
    //react组件实例中的 渲染 指的是调用render方法，然后得到一个react元素,会出现死循环
    
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


  state={number:0}
  // willReveiveProps 会在里面得到新属性 然后得到新的状态 进行更新 setState
  // 为了提高性能，一方面为了不让你在里面调用setState，所以是静态方法
  static getDerivedStateFromProps(nextProps,prevState){
    let {number} = nextProps
    if(number % 2==0){
      return {number:number*2}
    }else{
      return {number:number*3}
    }
    return null
  }

  componentDidMount(){
    console.log('ChildCounter componentDidMount')
  }

  shouldComponentUpdate(nextProps,nextState){
    console.log('ChildCounter shouldComponentUpdate')
    return true 
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
