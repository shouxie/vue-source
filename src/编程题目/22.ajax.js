const getJSON = function(url) {
  return new Promise((resolve, reject) => {
    const xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Mscrosoft.XMLHttp');
    xhr.open('GET', url, false);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) return;
      if (xhr.status === 200 || xhr.status === 304) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(xhr.responseText));
      }
    }
    xhr.send();
  })
}

const getJSON = (url)=>{
  return new Promise((resolve,reject)=>{
    const xhr = XMLHttpRequest ? new XMLHttpRequest():new ActiveXObject('Mscrosoft.XMLHttp');
    xhr.open('GET',url,false);
    xhr.setRequestHeader('Accept','application/json');
    xhr.onreadystatechange=function(){
      if(xhr.readState!==4) return;
      if(xhr.status === 200 || xhr.status === 304){
        resolve(xhr.responseText);
      }else{
        reject(new Error(xhr.responseText));
      }
    }
    xhr.send();
  });
}


const getJson = (url) => {
  return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest();
    xhr.open('GET',url,false);
    xhr.onreadystatechange = function(){
      if(xhr.readState!==4) return;
      if(xhr.status === 200 ||xhr.status === 304){
        resolve(xhr.responsetext);
      }else{
        reject(new Error(xhr,responseText));
      }
    }
  });
}



const getJSON = (url) =>{
  const xhr = new XMLHttpRequest();
  xhr.open('GET',url,false);
  xhr.onreadystatechange=function(){
    if(xhr.readyState!== 4) return;
    if(xhr.status===200 || xhr.status===304){
      resolve(xhr.responseText);
    }
  }
  xhr.send()
}