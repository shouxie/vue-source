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


// reduce
const flatten = arr =>{
  return arr.reduce((prev,cur)=>{
    return prev.concat(Array.isArray(cur)?flatten(cur):cur)
  },[])
}

// 正则 [1,[2,3],[4,[5,[6]]]]
const flatten = arr=>{
  return JSON.parse('['+JSON.stringify(arr).replace(/[\[\]]/g,'')+']');
}
console.log(flatten([1,[2,3],[4,[5,[6]]]]))


let arr = [1,[2,3],[4,[5,[6]]]]
console.log(arr.flat(Infinity))



// my code
const flat = arr =>{
  let result = [];
  for(let i=0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      return result.concat(flat(arr[i]));
    }else{
      return result.push(arr[i]);
    }
  }
}

const flat = arr =>{
  return JSON.parse('['+JSON.stringify(arr).replace(/[\[\]]/g,'')+']');
}

const flat = arr =>{
  return arr.reduce((prev,cur)=>{
     return prev.concat(Array.isArray(cur)?flat(cur):cur);
  },[]);
}



const flat=arr=>{
  return arr.reduce((pre,cur)=>{
    return pre.concat(Array.isArray(cur)?flat(cur):cur);
  },[]);
}




const flat = (arr) =>{
  arr.reduce((prev,cur)=>{
    prev = prev.concat(Array.isArray(cur) ? flat(cur) :cur);
    return prev;
  },[]);
}

const flat = (arr) =>{
  JSON.stringify(arr).replace(/[\[\]]/,'');
}