const Koa = require('./koa')
const app = new Koa()


const sleep = (time) => {
  return new Promise((reslove,reject)=>{
    setTimeout(() => {
        console.log('sleep')
        reslove()
    }, time);
  })
}
/*
app.use(function(ctx,next){
  console.log(1)
  ctx.body = 100
  next() // 只是执行函数 函数是同步执行的
  ctx.body = 200
  console.log(2)
})
app.use(async function(ctx,next){
  console.log(3)
  await sleep(2000)
  ctx.body = 600
  next()
  console.log(4)
})
app.use(function(ctx,next){
  console.log(5)
  next()
  console.log(6)
  ctx.body = 500
})*/
/*
1
3
2
sleep
5
6
4
页面显示200
*/

//koa中需要等待 一定要加await next前一定要加await
/*
中间件如果不是promise 最终内部也会包装成promise
*/
app.use(async function(ctx,next){
  console.log(1)
  let start = Date.now()
  await next()
  let end = Date.now() - start
  console.log('time',end)
  console.log(2)
})
app.use(async function(ctx,next){
  console.log(3)
  await sleep(2000)
  next()
  console.log(4)
})
app.use(function(ctx,next){
  console.log(5)
  next()
  console.log(6)
})
app.listen(3000)