// =====================================================
// 欢迎参加有赞前端 Coding 面试
// =====================================================
// 界面介绍：
//   上方设置按钮可以切换语言、字体大小、主题
//   右侧控制台可以显示代码执行结果，可用于编码过程中的 DEBUG
// =====================================================


/**
 * ## 问题1
 * 解析url中的queryString
 * 
 * 输入：https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D
 * 输出：
 * {
 *  name: "coder",
 *  age: "20",
 *  callback: "https://youzan.com?name=test",
 *  list: ["a", "b"],
 *  json: {
 *      str: 'abc',
 *      num: 123
 *  }
 * }
 */
function parseQuery(url) {
  /*
  https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D
  // name=coder&age=20
  let name = 
  name = coder
  new RegExp('^|&')+name+'='
  */
  // coding...
  let queryString = url.split('?')[1];
  let obj = {},arr = [];
  if (queryString.length){
      arr = queryString.split('&');
  }
  // let hash = new Map();
  arr.forEach(qs =>{
      let item = qs.split('=');
      let key = item[0],value=decodeURIComponent(item[1]);
      // hash.set(key,[value])
      if(key in obj){
        obj[key] = [...obj[key],value]
      }else {
        obj[key] = value;
      }
      
  
      
      
  })
  return obj;
  
}

const url = 'https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D';
console.log(parseQuery(url));


// Array.isArray([1,2,3])
// console.log(Array.isArray([1,2,3]))