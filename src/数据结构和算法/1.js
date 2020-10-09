/**插入排序

归并排序o（nlgn）

快速排序


渐近上界
渐近下界
渐近紧密界


ADT 抽象数据类型

链表和数组
数组 连续的内存 存储空间
链表 离散的内存 存储空间


栈  
队列  两个指针
*/
class Stack{
  constructor(max=1000){
    // 空间
    this.data = new Array(max)
    // 栈顶 （栈指针）
    this.top = -1;
    this.max=max
  }
  push(x){
    if(this.top===this.max-1){
      throw 'stackoverflow'
    }
    this.top++
    this.data[this.top] = x
  }
  pop(){
    if(this.top===-1){
      throw 'stackunderflow'
    }
    const x = this.data[this.top]
    this.top--
    return x
  }
  
}


/*
两个栈模拟队列
stack1 用于入队
stack2 用于出队
*/
class {
  constructor(max){
    super()
    this.s1=new Stack(max)
    this.s2 = new Stack(max)
  }
  enqueue(){
    this.s1.push(x)
  }
  dequeue(){
    if(this.s2.length>0){
      return this.s2.pop()
    }
    while(this.s1.length){
      this.s2.push(this.s1.pop())
    }
    return this.s2.pop()
  }
}
/*
斐波那契
*/
function feb(n){
  //O(2^n)
  return n > 2? feb(n-1)+feb(n-2) : 1
}
// 1 1 2 3 5 8 13
function feb(n){
  // O(n)
  let a = 1;
  let b = 1;
  for(let i=2;i<n;i++){
    const t = b // 1  2  3
    b=a+b // 1+1  1+2  2+3
    a=t // 1  2  3
  }
  return b
}

console.log(feb(5))
/*
用栈
function feb(n){
  const s = new Stack()
  s.push(feb(n))
}
*/

//双向链表

// 数组展平
function flattern(arr){
  let res = [].concat(...arr.map(x=>Array.isArray(x)?flattern(x):x))
  return res
}

function *flattern(arr){
  for(let i=0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      yield * flattern(arr[i])
    } else {
      yield arr[i]
    }
  }
}

function flattern(){
  const stack = arr.slice().reverse()
  const r = []
  while(stack.length){
    const item = statck.pop()
    if(item.constructor===Array){
      // Array.isArray(item)
      stack=stack.concat(item)
    }else{
      r.push(item)
    }
  }
  return r
}

function depth_first_search(node){
  let stack = [node]
  while(stack.length>0){
    const item = stack.pop()
    for(let i=0;i<item.children.length;i++){
      stack.push(item.children[i])
    }
  }
}

function breadth_first_search(node){
  let queue = [node]
  while(queue.length>0){
    const item = queue.pop();
    for(let i=0;i<item.children.length;i++){
      queue.unshift(item.children[i])
    }
  }
}

// 算法图解
// 二分查找
function mid_search(arr,val){
  let high = arr.length-1;
  let low = 0;
  while(low<=high){
    let mid = parseInt((low + high)/2);
    if(val === mid) return mid;
    if(val > mid){
      low = mid+1;
    }else if (val < mid) {
      high = mid+1;
    } else {
      return -1;
    }


  }

}


// 选择排序
/*
O（n^2）
找出最小的，放进新数组，接着找最小的
*/


function select_sort(arr){
  for(let i=0;i<arr.length-1;i++){
    let index =i;
    for(let j=i+1;j<arr.length;j++){
      if(arr[index]>arr[j]){
        index = j;
      }
    }
    if(index !== i){
      [arr[index],arr[i]] =[arr[i],arr[index]];
    }
  }
  return arr;
}
console.log(select_sort([1,70,10,9,6]))

// 快速排序
/*
选择一个基数，分而治之，递归调用
*/
function quick_sort(arr){
  if(arr.length<2) return arr;
  let mid = Math.floor(arr.length/2);
  let midItem = arr.splice(mid,1)[0];
  let left = [];
  let right = [];
  for(let i=0;i<arr.length;i++){
    if(arr[i]<midItem){
      left.push(arr[i]);
    }else{
      right.push(arr[i]);
    }
  }
  return quick_sort(left).concat(quick_sort(midItem),quick_sort(right))
}