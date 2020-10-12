// 防抖 超过规定间隔时间才会执行,一般用于输入框

function debounce(fn,time){
  let timer = null;
  return function(){
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(()=>{
      fn.apply(this,arguments)
    },time)
  }
}


// 节流 规定时间内只执行一次
function throttle(fn,time){
  let canRun = true
  return function(){
    if(!canRun) return
    canRun = false
    setTimeout(()=>{
      fn.apply(this,arguments)
      canRun = true
    },time)
  }
}


// my code

function debounce(fn,time){
  let timer = null;
  return function(){
    if(timer){
      clearTimeout(timer);
      timer = setTimeout(()=>{
        fn.apply(this,arguments);
      },time)
    }
  }
}

function thorttle(fn,time){
  let canRun = true;
  return function(){
    if(!canRun) return;
    canRun = false;
    setTimeout(()=>{
      fn.apply(this,arguments);
      canRun = true;
    },time)
  }
}


function debonce(fn,time){
  let timer = null;
  return function(){
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this,arguments);

    }, time);
  }
}

function throttle(fn,time){
  let canrun = true;
  return function(){
    if(!canrun) return;
    canrun=false;
    setTimeout(() => {
      fn.apply(this,arguments);
      canrun=true;
    }, time);
  }
}