Array.prototype.filter=function(fn,context){
  if(typeof fn !== 'function') {
    throw new Error('fn is not a functopn')
  }
  let arr = this;
  let res = [];
  for(let i=0;i<arr.length;i++){
    let temp = fn.call(context,arr[i],i,arr)
    if(temp){
      res.push(arr[i])
    }
  }
  return res;
}


// my code
Array.prototype.filter=function(fn,context){
  if(this==undefined) {
    throw new Error('this is null or not defined')
  }
  if(typeof fn !== 'function'){
    throw new Error(fn+'is not a function');
  }
  let res = [];
  let arr = this;
  for(let i=0;i<arr.length;i++){
    if(fn.call(context,arr[i],i,arr)){
      res.push(arr[i]);
    }
  }
  return res;
}



function fil(fn,context){
  if(typeof fn !== 'function'){
    throw new Error('');
  }
  let res = [];
  for(let i=0;i<arr.length;i++){
    let temp = context.call(context,arr[i],i,arr);
    if(temp){
      res.push(arr[i]);
    }
  }
  return res;
}


Array.prototype.filter = function(fn,context){
  let res = [];
  for(let i =0;i<this.length;i++){
    let temp = fn.call(context,this[i],i,this);
    if(temp) {
      res.push(temp);
    }
  }
  return res;
}