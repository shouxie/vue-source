/*
 * @Author: shouxie
 * @Date: 2020-08-19 11:51:47
 * @Description: 
 */
//node 核心模块 crypto 功能用来摘要， 加密
const crypto = require('crypto')
const fs = require('fs')
/*
摘要算法 不叫加密 md5 不可逆
根据文件内容摘要对应的结果 每次内容不一样，摘要出来的结果完全不一样
不管内容有多少，摘要出的结果永远长度相同，相同的内容多次摘要的结果相同

*/
let data = fs.readFileSync('./package.json')
let r = crypto.createHash('md5').update('123456').digest('base64')
console.log(r)

/*
可以进行指纹认证
如果密码用md5存储，可能会导致
加盐算法
*/

/*
登陆校验  http是无状态的  jwt 传递给客户端的值是可靠的
*/
crypto.createHmac('sha256','dd').update('123').digest('base64')