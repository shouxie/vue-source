// 分而治之 找出数组中间的元素，比他大的放右边，小的放左边，递归，直到数组元素小于2
function sort(arr){
  if(arr.length<2) return arr;
  let left=[];
  let right = [];
  let mid = Math.floor(arr.length/2);
  let midItem = arr.splice(mid,1)[0];
  for(let i=0;i<arr.length;i++){
    if(arr[i]<midItem){
      left.push(arr[i]);
    }else{
      right.push(arr[i]);
    }
  }
  console.log(left,right)
  return sort(left).concat([midItem],sort(right))
}
console.log(sort([1,9,7,8,2,5]))