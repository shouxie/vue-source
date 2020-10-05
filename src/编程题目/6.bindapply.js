Function.prototype.call=function(context,...args){
  let fn = this;
  context.fn = fn;
  let result = context.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype.apply=function(context,arr){
  let fn = this;
  context.fn = fn;
  let result = context.fn(...arr);
  delete context.fn;
  return result;
}


Function.prototype.bind=function(context,...args){
  let fn = this;
  return function(){
    fn.call(context,...args,...arguments);
  }

}

Function.prototype.call = function(context,...args){
  context.fn = this;
  let result = fn.context();
  delete context.fn;
  return result;
}

Function.prototype.apply=function(context,arr){
  context.fn = this;
  let result = context.fn(...arr);
  delete context.fn;
  return result;
}

Function.prototype.bind=function(context,...args){
  let fn = this;
  return function(){
    fn.call(context,...args,...arguments);
  }
}