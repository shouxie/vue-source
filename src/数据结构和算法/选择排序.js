// 选出未排序的第一个元素，找出最小的交换位置
function sort(arr){
  for(let i=0;i<arr.length-1;i++){
    let index = i;
    for(let j=i+1;j<arr.length;j++){
      if(arr[j]<arr[index]){
        index= j;
      }
    }
    if(index !== i){
      [arr[index],arr[i]]=[arr[i],arr[index]];
    }
  }
  return arr;
}
console.log(sort([1,9,7,8,2,5]))