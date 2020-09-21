import React,{Component,createRef} from 'react'
import ReactDom from 'react-dom'
import  {HashRouter,Route} from 'react-router-dom'
// exact 精确匹配
ReactDom.render(
<HashRouter>
  <>
  <Route exact path="/" component={Home}></Route>
  <Route path="/user" component={User}></Route>
  <Route path="/profile" component={Profile}></Route>
  </>
</HashRouter>,
document.getElementById('root'))
