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