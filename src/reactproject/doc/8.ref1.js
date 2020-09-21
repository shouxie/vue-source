import React,{Component,createRef} from 'react'
import ReactDom from 'react-dom'


/*
ref
 reference 引用
 可以让我们访问真实的dom节点
 1. this.refs.a
 2. ref={input => this.a = input}
 3. React.createRef

 因为函数没有实例，函数组件不能直接给ref，用到下面方法
*/
class Form extends Component{
  constructor(props){
    super(props)
    this.input = createRef() 
  }

  getFocus=()=>{
    this.input.current.focus()
  }
  
  

  render(){
    return (
      <div>
        <TextInput ref={this.input} />
        <button onClick={this.getFocus}>获得焦点</button>
      </div>
    )
  }
}

function TextInput(props,ref){
    return  (
      <div>
        <input ref={ref} />
      </div>
    )
}
TextInput = React.forwardRef(TextInput)

class TextInput extends Component{
  constructor(props){
    super(props)
    this.input = createRef()
  }
  focus=()=>{
      this.input.current.focus()
  }
  render(){
    return (
      <div>
        <input ref={this.input} />
      </div>
    )
  }
}

ReactDom.render(<Form/>,document.getElementById('root'))
