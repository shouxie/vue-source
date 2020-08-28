// localStorage sessionStorage session cookie

/*
存储滚动条位置 sessionStorage 大小 5M
cookie 用来做凭证信息 http 无状态的
*/

const http = require('http')
const querystring = require('querystring')
const crypto  = require('crypto')

const sign = (value) =>{
  const secret = 'hello zf'
  return crypto.createHmac('sha256',secret).update(value+'').digest('base64').replace(/\+|\//g,'')
}
http.createServer((req,res)=>{
  req.getCookie = function(key,options={}){
    let queryObj = querystring.parse(req.headers['cookie'],'; ')
    if(queryObj[key]){
      return null
    }
    
    let [value,s ] = queryObj[key].split('.')
    if (options.signd){ // 要校验签名
      if(sign(value) === s){
        return value
      }else{
        return null
      }
    }
    return value
  }

  let arr = []
  res.setCookie = function(key,value,options){
    
    let args = []
    if (options.domain){
      args.push(`domain=${options.domain}`)
    }
    if (options.path){
      args.push(`path=${options.path}`)
    }
    if (options.httpOnly){
      args.push(`httpOnly=${options.httpOnly}`)
    }
    if (options.signd){ // 需要增加签名
      value = value + '.' + sign(value)
    }
    arr.push(`${key}=${value}; ${args.join('; ')}`)
    res.setHeader('Set-Cookie',arr)
  }

  if (req.url === '/read'){
    // let queryObj = querystring.parse(req.headers['cookie'],'; ')
    // res.end(queryObj.name)
    res.end(req.getCookie('age',{signd:true}))
  }
  if (req.url === '/write'){
    /*
    domain 域名设置 cookie 也是不能跨域的，但是可以父子共享
    path 目的：减少请求时所带的信息   header cookie的大小不能超过4k
    expires max-age
    http-only
    */
    res.setCookie('name','zf',{domain:''})
      // res.setHeader('Set-Cookie',['name=zf; domain=qpp.node.cn;max-age=5;httpOnly=true','age=2;'])
      res.end()
  }
  if(req.url==='/visit'){
    let cookie = req.getCookie('visit',{signd:true})
    if(!cookie){
      // visit=1.xxxxx
      res.setCookie('visit',1,{signd:true}) // 增加签名
      res.end('first visit')
    } else {
      res.setCookie('visit',cookie-0+1,{signd:true})
      res.end(`${cookie-0+1}`+' visit')
    }
  }
}).listen(3000)