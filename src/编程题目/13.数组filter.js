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
