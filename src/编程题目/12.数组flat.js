// 多纬数组转为一纬数组

function flat(arr){
  let result =[]
  for(let i=0;i<arr.length;i++){
    console.log(result,arr[i])
    if(Array.isArray(arr[i])){
      result = result.concat(flat(arr[i]))
    }else{
      result.push(arr[i])
    }
  }
  return result
}

console.log(flat([1,[2,3],[4,[5,6]]]))


function flattenByDeep(arr,deep){
  let res=[];
  for(let i=0;i<arr.length;i++){
    if(Array.isArray(arr[i])&&deep>1){
      res= res.concat(flattenByDeep(arr[i],deep-1));
    }else{
      res.push(arr[i]);
    }
  }
  return res;
}