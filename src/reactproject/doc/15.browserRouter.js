/*
利用h5实现路由的切换
history：
history对象提供了操作浏览器会话历史的接口
historylength 属性声明了浏览器历史列表中的元素数量
pushState HTML5引入了history.pushState 和 history.repalceState方法，
他们分别可以添加和修改历史记录条目，这些方法通常与window.onpopState配合使用
onPopState window.onPopState 是popState事件在window对象上的事件处理程序
*/

window.onpopstate=(event)=>{
  console.log(event)
}

/*
pushState 有三个参数 1.参数 state 2.标题 3 路径
*/
setTimeout(() => {
  history.pushState({page:1},'page1','/page1')
}, 1000);
setTimeout(() => {
  history.pushState({page:2},'page2','/page2')
}, 2000);
setTimeout(() => {
  history.pushState({page:3},'page3','/page3')
}, 3000);
setTimeout(() => {
  history.replaceState({page:4},'page4','/page4')
}, 4000);
setTimeout(() => {
  history.back()
}, 5000);

// go 1 往前跳  -1 往后跳
setTimeout(() => {
  history.go(1)
}, 5000);


// pushState 和 replaceState 是不会触发 onPopState的，需要重写，back和go会触发

window.onpushState = (event)=>{

}
(function(history){
  let pushState = history.pushState
  history.pushState = function(state,title,pathname){
    if(typeof window.onpushState === 'function'){
      window.onpushState({state,pathname,type:'pushState'})
    }
    return pushState.apply(history,arguments)
  }
})(window.history)