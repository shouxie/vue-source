function removeDup(arr){
  let result = []
  let hashMap={}
  for(let i=0;i<arr.length;i++){
    let temp = arr[i];
    if(!hashMap[temp]){
      hashMap[temp]=true
      result.push(temp)
    }
  }
  return result
}

// Array.from(new Set(arr))
// let res = [...new Set(arr)]


function removeDup(arr){
  let result = []
  let hashmap={}
  for(let i=0;i<arr.length;i++){
    let temp=arr[i]
    if(!hashmap[temp]){
      hashmap[temp]=true
      result.push(temp)
    }
  }
  return temp
}

Array.from(new Set(arr))

let res = [...new Set(arr)]

// indexOf includes filter
const unique = arr =>{
  let res = [];
  for(let i=0;i<arr.length;i++){
    if(res.indexOf(arr[i])===-1) res.push(arr[i]);
  }
  return res;
}
// [1,2,3,3,4]
const unique = arr =>{
  return arr.filter((item,index)=>{
    return arr.indexOf(item)===index;
  })
}

// my code

const removeDup = arr =>{
  let res = [];
  let hashmap = {};
  for(let i=0;i<arr.length;i++){
    if(!hashmap[arr[i]]){
      hashmap[arr[i]] =true;
      res.push(arr[i]);
    }
  }
  return res;
}
const removeDup = arr => Array.from(new Set(arr));
const removeDup = arr=> [...new Set(arr)];

const removeDup=arr=>{
  let res = [];
  for(let i=0;i<arr.length;i++){
    if(res.indexOf(arr[i])===-1) res.push(arr[i]);
  }
  return res;
}

const removeDup = arr =>{
  return arr.filter((item,index)=>{
    return arr.indexOf(item) === index;
  });
  
}