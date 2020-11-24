const jsonp = (config) =>{
  return new Promise((resolve,reject)=>{
    let script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    let parseData=(params)=>{
      if(typeof params === 'string'){
        return params;
      } else if(typeof params === 'object'){
        let query = '';
        for(let key in params){
          return query+= `${key}=${encodeURIComponent(params[key])}`;
        }
      }
    }
    config.url = `${config.url}?${parseData(config.params)}`
    let funcName = /callback=(\w+)/.exec(config.url);
    window[funcName]=function(data){
      resolve(data);
    }
    script.setAttribute('src',config.url);
    document.body.appendChild(script);
  })
}

jsonp({
  url:'',
  params:{},
  //...
  }).then()
  
  obj={
  a:{
  b:{}
  }
  }


  function jsonp(obj){
    const {url,data} = obj;
    if(!url) return;
    return new Promise((resolve,reject)=>{
      const head = document.querySelector('head');
      const script = document.createElement('script');
      let src = '';
      if(typeof data === 'object'){
        src = `${url}?${parseUrl(data)}`;
      } else if(typeof data === 'string'){
        src=`${url}?${data}`
      }
      let cbFn = /callback=(\w+)/.exec(src)?/callback=(\w+)/.exec(src)[1]:`jsonp_${Date.now()}`;
      script.src=src;
      head.appendChild(script);
      window[cbFn]=function(res){
        res?resolve(res):reject('error');
        head.removeChild('script');
        window[cbFn]=null;
      }
    })
  }

  function parseUrl(obj){
    return Object.keys(obj).reduce((acc,cur)=>{
        acc.push(`${cur}=${obj[cur]}`);
        return acc;
    },[]).join('&');
  }



/*
obj:{
  url:'',
  data:{}/''
}
*/
function handleParams(data){
  if(typeof data === 'string'){
    return data;
  }else{
    // let res = [];
    // for(let key in data){
    //   res.push(`${key}=${data[key]}`);
    // }
    return Object.keys(data).reduce((pre,cur)=>{
      pre.push(`${cur}=${data[cur]}`);
      return pre;
    },[]).join('&');
    // return res.join('&');
  }
}
function jsonp(obj){
  let script = document.createElement('script');
  script.type="text/javascript";
  let query = handleParams(obj.data);
  let fn = `jsonp_${Date.now()}`;
  let callback = /callback=(\w+)/.exec(query)[1];
  let url =obj.url;
  if(callback){
    fn = callback;
    url += '?'+query;
  }else{
    url += query + `callback=${fn}`;
  }
  script.src=url;
  let head = document.getElementsByTagName('head');
  head.appendChild(script);
  window[fn]=function(data) {
    return new Promise((resolve,reject)=>{
      if(data) resolve(data);
      else reject('error');
      head.removeChild(script);
    })
  }
}


/*
obj:{
  url:'',
  data:{}/''
}
*/

const jsonp = (obj) =>{
  return new Promise((resolve,reject)=>{
    let script = document.createElement('script');
    script.type="type/javascript";

    let data = handle(obj.data),fn = `jsonp_${Date.now()}`;
    if(data.indexOf('callback')===-1){
      data = data + `callback=${fn}`;
    }else{
      fn = /callback=(\w+)/.exec(data)[1];
    }
    let url = obj.url + data;
    script.src = url;

    window[fn] = function(data){
      if(data){
        resolve(data);
      }else{
        reject('not data');
      }
      head.removeChild(script);
    }
    let head = document.querySelector('head');
    head.appendChild(script);
  });
};

const handle = (obj) =>{
  if(typeof obj === 'object'){
    return Object.keys(obj).reduce((prev,cur)=>{
      prev = prev.concat(`${cur}=${obj[cur]}`);
      return prev;
    },[]).join('&');
  } else {
    return obj;
  }
};
console.log(handle({a:'1',b:'2'}))