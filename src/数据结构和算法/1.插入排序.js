/*
插入
一个有序数组A，要插入的元素x
将x插入到数组中，依旧是有序的

插入排序
*/


// function insert(arr,x){
//   let max = arr.find(i => i>x);
//   if(max === undefined) arr.push(x);
//   else {
//     let idx = arr.indexOf(max);
//     arr.splice(idx,0,x);
//   }
// }



function insert(arr,i,x){
  let p = i-1;
  while(p>=0&&arr[p]>x){
    arr[p+1] = arr[p--];
  }
  arr[p+1] = x;
}
let a = [1,2,3,6,7]
insert(a,5)
console.log(a)



function insert_sort(A){
  for(let i=1;i<A.length;i++){
    insert(A,i,A[i]);
  }
}




function insertion_sort(arr){
  for(let i=1;i<arr.length;i++){
    insert(arr,i,arr[i]);
  }
}
function insert(arr,i,x){
  let p = i -1 ;
  while(p>=0&&arr[p]>x){
    arr[p+1]=arr[p--];
  }
  arr[p+1] =x;
}