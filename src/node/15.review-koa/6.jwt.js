const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const jwt = require('jwt-simple')
const router = new Router()
const secrect='zf'
const bodyparser = require('koa-bodyparser')
app.use(bodyparser())

// base64 crpto

let myjwt = {
  escape(content){
    return content.replace(/\=/g,'').replace(/\+/g,'-').replace(/\//g,'_')
  },
  unscape(str){
    str += new Array(5-str.length%4).join('=')
    return str.replace(/\-/g,'+').replace(/_/g,'/')
  },
  toBase64Url(content){
    let base64 = this.escape(Buffer.from(content).toString('base64'))
    return base64
  },
  encode(content,secret){
    let header = this.toBase64Url(JSON.stringify({"typ":"JWT","alg":"HS256"}))
    let content = this.toBase64Url(JSON.stringify(content))
    let sign = this.sign(header+'.'+content,secret) // 加盐算法 crpto
    return header+'.'+content+'.'+sign
  },
  sign(content,secret){
    let hmac = require('crypto').createHmac('sha256',secret).update(content).digest('base64')
    return this.escape(hmac)
  },
  decode(token,secret){
    let [header,content,sign] = token.split('.')
    let newSign = this.sign(header+'.'+content,secrect)
    if (newSign!==sign){
      // 签名是可以的，否则说明信息被改过
      throw new Error('签名被改了')
    } else {
      return JSON.parse(Buffer.from(this.unscape(content),'base64').toString())
    }
  }
}

// 写登陆 给用户派发一个token
router.post('/login',async(ctx,next)=>{
  let {username,password} = ctx.request.body;
  if(username===password){
    let token = jwt.encode({username},secrect)
    ctx.body = {
      data:{username},
      token
    } 
  }else {
    ctx.body = {
      data:'登陆异常',
      err:1
    }
  }
  
})

router.get('/validate',async (ctx,next)=>{
  let token = ctx.get['authorization']
  
  try {
    let r = jwt.decode(token,secrect)
    ctx.body={
      data:r
    }
  } catch (error) {
    ctx.body={
      data:'密钥不正确',
      err:1
    }
  }
})

app.use(router.routes())
app.listen(3000)