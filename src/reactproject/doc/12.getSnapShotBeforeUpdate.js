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
class ScrollList extends Component{
  constructor(props){
    super(props)
    this.state = {messages:[]}
    this.container = createRef()
  }


  componentDidMount(){
    this.timer = setInterval(() => {
        this.addMessage()
    }, 1000);
  }

  // 在更新前获取快照

  getSnapshotBeforeUpdate(){
    // scrollTop 向上卷去的高度  scrollHeight 内容
    return this.container.current.scrollHeight // 先获取老的内容高度
  }
  componentDidUpdate(prevProps,prevState,prevScrollHeight){
    const currentScrollTop = this.container.current.currentScrollTop
    this.container.current.currentScrollTop = currentScrollTop+(this.container.current.scrollHeight-prevScrollHeight)
  }

  addMessage=()=>{
    this.setState(state=>({
      message:[state.messages.length,...state.messages]
    }))
  }


  render(){
    let styleObj = {
      height:100,
      width:200,
      order:'1px solid red',
      overflow:'auto'
    }
    return (
      <div style={styleObj} ref={this.container}>
        {this.state.messages.map((message,index)=>{
          <div key={index}>{message}</div>
        })}
      </div>
    )
  }
}




ReactDom.render(<ScrollList/>,document.getElementById('root'))
