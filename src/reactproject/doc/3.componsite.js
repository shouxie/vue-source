import React,{Component} from 'react'
import ReactDom from 'react-dom'

class PanelHeading extends Component{
  render(){
    return <div>PanelHeading</div>
  }
}
class PanelBody extends Component{
  render(){
    return <div>PanelBody</div>
  }
}
class PanelFooter extends Component{
  render(){
    return <div>PanelFooter</div>
  }
}
class Panel extends Component{
  render(){
    return <div>
      <PanelHeading/>
      <PanelBody/>
      <PanelFooter/>
    </div>
  }
}
/*

*/
// jsx语法
ReactDom.render(<Panel/>,document.getElementById('root'))
