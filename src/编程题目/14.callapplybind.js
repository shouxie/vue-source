Function.prototype.call=function(context,...args){
  context = context||window;
  context.fn = this;
  let res = context.fn(...args);
  delete context.fn;
  return res;
}

Function.prototype.apply=function(context,arr){
  context=context||window;
  context.fn=this;
  let res = context.fn(...arr);
  delete context.fn;
  return res;
}
Function.prototype.bind=function(context,args){
  let fn = this;
  return function(){
    fn.call(context,...args,...arguments)
  }
}


// my code
Function.prototype.call=function(context,...args){

  context = context || window;
  context.fn = this;
  let res = context.fn(...args);
  delete context.fn;
  return res;
}

Function.prototype.apply=function(context,arr){
  context=context||window;
  context.fn=this;
  let res = context.fn(...arr);
  delete context.fn;
  return res;
}
Function.prototype.bind=function(context,...args){
  let fn = this;
  return function(){
    fn.call(context,...args,...arguments);
  }
}