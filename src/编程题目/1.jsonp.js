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





  function jsonp(obj){
    return new Promise((resolve,reject)=>{
      // let {url,params}=obj;
      
      let path = parseUrl(obj.params);
      let fn = `jsonp_${Date.now()}`;
      if(path.indexOf('callback')===-1){
        path=path+'&callback'+fn;
      }else{
        fn = /callback=(\w+)/.exec(path)[1];
      }
      createScript(path);
      window[fn]=function(res){
        if(res){
          resolve(res);
        }else{
          reject('error');
        }
      }
     
      
      

    });
  }

  function parseUrl(url,params){
    let path = '';
    if(Object.prototype.toString.call(params) === '[Object String]'){
      path=url+'?'+params;
    }else{
      let arr = [];
      for(let key in url){
        arr.push(`${key}=${encodeURIComponent(url[key])}`);
      }
      path=url+'?'+arr.join('&');
      // url.split('&').reduce((prev,cur)=>{
      //   let [name,value] = cur.split('=')
      // })
      return path;
      
    }
  }
  function createScript(src){
    let script = document.createElement('script');
    script.src=src;
    script.type="text/javascript";
    let head = document.querySelector('head');
    head.appendChild(script);

  }