import React,{Component,createRef} from 'react'
import ReactDom from 'react-dom'


/*
ref
 reference 引用
 可以让我们访问真实的dom节点
 1. this.refs.a
 2. ref={input => this.a = input}
 3. React.createRef
*/
class Sum extends Component{
  constructor(){
    super()
    this.a = createRef() // {current:null}
    this.b = createRef()
    this.result = createRef()
  }
  
  handleAdd=()=>{
    /*
    let a = this.refs.a.nodeValue
    let b = this.refs.b.nodeValue
    this.refs.result.value = eval(a+'+'+b)
    */
    /*
    let a = this.a.value
    let b = this.b.value
    this.result.value = eval(a+'+'+b)
    */

   let a = this.a.current.value
   let b = this.b.current.value
   this.result.current.value = eval(a+'+'+b)
    
    

  }


  render(){
    return (
      <div>
        <h1>hello</h1>
        {/* <input ref='a' />+<input ref='b'/><button onClick={this.handleAdd}>=</button><input ref='result' /> */}
        {/* <input ref={input=>this.a=input} />+<input ref={input=>this.b=input}/><button onClick={this.handleAdd}>=</button><input ref={input=>this.result=input} /> */}
        <input ref={this.a} />+<input ref={this.b}/><button onClick={this.handleAdd}>=</button><input ref={this.result} />
      </div>
    )
  }
}

ReactDom.render(<Sum/>,document.getElementById('root'))
