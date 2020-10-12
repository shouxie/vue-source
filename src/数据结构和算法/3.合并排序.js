/*
先拆分，再合并
时间复杂度为O（nlgn）
*/
function merge(arr,p,q,r){
  /*
  p:开始位置
  q：切割的位置
  r：右边结束的位置
  */
 let a1 = arr.slice(p,q),
     a2 = arr.slice(q,r);
  a1.push(Number.MAX_SAFE_INTEGER);//integer Infinity
  a2.push(Number.MAX_SAFE_INTEGER);
  /*
  k:要合并的数组要放的位置
  i：a1的指针
  j：a2的指针
  判断两个数组当前谁小，放谁到k，它的指针向后移动

  */
  for(let k=p,i=0,j=0;k<r;k++){
    arr[k]=a1[i]<a2[j]? a1[i++]:a2[j++];
  }
}
// let a = [1,3,5,2,4,8]
// merge(a,0,3,6)
// console.log(a)


function merge_sort(arr,p,r){
  if(r-p<2) return;
  let q = Math.ceil((p+r)/2);
  merge_sort(arr,p,q);
  merge_sort(arr,q,r);
  merge(arr,p,q,r);
}
let a = [1,13,53,22,45,86]
merge_sort(a,0,a.length)
console.log(a)