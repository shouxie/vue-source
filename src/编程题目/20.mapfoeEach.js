Array.prototype.map=function(fn,thisArg){
  if(typeof this == undefined){
    throw new Error('this is null or not defined');
  }
  if(typeof fn !== 'function'){
    throw new Error(fn+'is not a function');
  }
  let res=[];
  let arr = this;
  for(let i=0;i<arr.length;i++){
    res[i]=fn.call(thisArg,arr[i],i,arr);
  }
  return arr;
}

//forEach跟map类似，唯一不同的是forEach是没有返回值的。