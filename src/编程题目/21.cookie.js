function getCookie(name){
  if(document.cookie.length){
    let start = document.cookie.indexOf(name+'=');
    if(start !== -1){
      start += name.length+1;
      let end = document.cookie.indexOf(';',start);
      if(end === -1) end = document.cookie.length;
      let val = document.cookie.substring(start,end);
      return unescape(val);
    }
  }
}


function getCookie(name){
  let cookie = document.cookie;
  if(cookie.length){
    let start = cookie.indexOf(name+'=');
    if(start !== -1){
      start += 1;
      let end = cookie.indexOf(';',start);
      if(end !== -1) {
        let val = cookie.substring(start,end);
        return unescape(val);
      }
    }
  }
}


function getCookie(name){
  let cookie = document.cookie;
  if(cookie.length){
    let start = cookie.indexOf(name+'='),
        end = cookie.indexOf(';',start);
  }
}