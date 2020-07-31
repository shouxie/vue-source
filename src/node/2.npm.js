/*
 * @Author: shouxie
 * @Date: 2020-07-21 15:24:32
 * @Description: 
 */ 
/*

npm
第三方模块


全局包   命令下使用
本地包    项目中使用

全局包：
npm init

代码中指明
#！ /usr/bin/env node

package.json 中
"bin":{
  "my-pack":"./bin/www.js"
}


npm link 创建链接


本地包：
项目依赖 --save          npm install --production
开发依赖 --save-dev  上线不需要
同等依赖 peerDependencies
可选依赖 optionalDependencies
打包依赖 bundleDependencies




版本 1.2.3
1 重大变化
2 小版本
3 补丁

~  保证第二位，第二个版本不能变
^  保证第一位 第一个版本不能变
>= 
<=

Alpha 内部测试版本
Beta 测试版
RC 快发布了


npm 和 git 同步 git tag
npm version major
npm version minor
npm version patch


script 脚本 和npx

开发项目时，希望使用快捷命令

mime

npx 把当前目录下的node_modules .bin 文件 放到path中
如果包不存在 可以帮我们下载


"scripts":{
  "predev":"", dev之前
  "dev":"",
  "postdev":"" dev之后
}


发布包

登陆到官方npm上

安装nrm 切换源
npm addUser
npm login
npm search 包名 查找是否已经有了
npm publish
npm unpublish --force
*/