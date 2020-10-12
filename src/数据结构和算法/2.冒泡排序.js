// 冒泡排序
function sort(arr){
  for(let i=1;i<arr.length;i++){
    for(let j=0;j<arr.length-i;j++){
      if(arr[j]>arr[j+1]){
        [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
      }
      console.log('arr',arr,'j:',j)
    }
  }
  return arr
}
 

console.log(sort([1,9,7,8,2,5]))


function sort1(arr){
  for(let i=1;i<arr.length;i++){
    for(let j=0;i<arr.length-i;j++){
      if(arr[j]>arr[j+1]){
        [arr[j],arr[j+1]]=[arr[j+1],arr[j]];
      }
    }
  }
}
// 时间复杂度 O（n^2）
console.log(sort1([1,9,7,8,2,5]))











function sort(arr){
  for(let i=0;i<arr.length-1;i++){
    for(let j=0;j<arr.length-i;j++){
      if(arr[j]>arr[j+1]){
        [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
      }
    }
  }
}



function sort(arr){
  for(let i=0;i<arr.length-1;i++){
    for(let j=0;j < arr.length-i;j++){
      if(arr[j]>arr[j+1]){
        [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
      }
    }
  }
}