const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlInlineCssWebpackPlugin = require('html-inline-css-webpack-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglify-js-plugin')
module.exports = {
  optimization:{
    minimizer:[
      new OptimizeCss(),
      new UglifyJsPlugin()
    ]
  },
  mode:'development',
  // webpack打包会从入口出发，打包所有的文件
  entry:{
    index:'./src/index.js',
    common:'./src/common.js'
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    publicPath:'http://www.xxx',// 静态资源路径
    // filename:'bundle.js'
    filename:'[name].js' // 针对多个入口块
  },
  // loader 如何转换模块代码
  //  从右往左 从下到上
  
  /*
  三种loader写法：
  1. loader数组 从右往左执行  字符串数组
  2. use  字符串数组
  如果需要传参数的话，可以改成对象


  expose-loader 暴露全局的loader 内联的loader
  pre 前面执行的loader
  normal

  */

/*
引入图片
*/

  module:{
    noParse:/jquery/, // 不去解析jquery中的依赖项
    /*
    插件就是一个个的转换方法
    比如：转换箭头函数的，转换类的属性的插件，转换装饰器的

    预设preset 是插件的集合

    babel-loader 内部会调用babel-core 实现语法转换 core 空的引擎 本身不工作，要靠插件来实现转换
    */
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader:'babel-loader',
            options:{
              "preset":[
                "@babel/preset-env"
              ],
              "plugins":[
                ["@babel/plugin-proposal-decorators",{"legacy":true}],
                ["@babel/plugin-proposal-class-properties",{"loose":true}],
                [ // 把工具代码抽离成模块，自动引入，减少每个模块的代码，plugin-transfrom-runtime内部会调用@babel/runtime
                  "@babel/plugin-transfrom-runtime",{
                    /*
                    runtime 一些工具方法 es6类 转译成es5 function
                    polyfill promise set map includes
                    */
                    "corejs":false,
                    "helpers":true,
                    "regenerator":true,
                    "useESModules":true
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        // 可以用现成的 eslint-config-airbnb
        test:/\.js$/,
        loader:'eslint-loader',
        enforce:'pre', // pre post 先执行，后执行
        include:[path.resolve(__dirname,'src')],
        options:{
          fix:true // 自动修复
        }
      },
      {
        test:/\.css$/, // 
        // loader 两种写法
        // 从右往左执行  css-loader 处理css中的url和import语句的
          //style-loader 把css代码转成style标签并插入html中 
          // css-loader 在内容方面是处理url import ，另外会把这个css模块变成js模块 
        /*loader:[
          'style-loader','css-loader'
        ],*/
        use:[
          miniCssExtractPlugin.loader,// 分离css的插件，这时候不需要style-loader
          // {
          //   loader:'style-loader',
          //   options:{insert:'head'} // 插入的位置 head body
          // },
        'css-loader','postcss-loader']
      },
      /*
      js里引入图片：const img = require('xxx')
      import img from 'xxx'
      css里引入图片：
      url-loader 是对file-loader的增强，它会判断如果说文件的体积
      小于limit参数指定的值的话，会返回一个base64的图片字符串
      */
      {
        test:/\.(jpg|png|gif|svg)/,
        use:[
          {
            // loader:'file-loader'
            loader:'url-loader',
            options:{
              limit:1024,
              outputPath:'images',// 指定图片的输出路径
              publicPath:'/images' // 
            }
          }
        ]
      },
      {
        test:/\.less/,
        include:path.resolve(__dirname,'src'),
        exclude:/node_modules/,
        use:[
          miniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test:/\.scss/,
        include:path.resolve(__dirname,'src'),
        exclude:/node_modules/,
        use:[
          miniCssExtractPlugin.loader,
          'css-loader',
          'scss-loader'
        ]
      },
      /*
      兼容css3，前缀
      postcss-loader autoprefixer
      postcss-loader两个功能：
      1. 把css解析成js可以操作的 抽象语法树结构ast
      2. 调用插件处理ast并得到结果
      postcss.config.js
      module.exports = {
        plugins:[require('autoprefixer')]
      }
      css 后缀loader加postcss-loader
      */
    ]
  },
  /*
  webpack-merge 单独两个文件一个开发一个生产 合并文件
  let {smart} = require(' webpack-merge')
  let base = require('webpack.base.js)
  module.exports=smart(base,{
    mode:'production'
  })
  */
  plugins:[
    new webpack.NamedModulesPlugin(), // 打印更新的模块路径
    new webpack.HotModuleReplacementPlugin(),//热更新插件
    new Webpack.IgnorePlugin(/\.\/locale/,/moment/), // moment 插件中引入了好多语言包，所以忽略掉
    new Webpack.DefinePlugin({
      DEV:JSON.stringify('dev'),
    }),
    new miniCssExtractPlugin({
      /*
      文件指纹
      [name] 代码块的名称 entry中的key
      [hash] 代表一次编译 不管改多少文件，每次编译都产生同一个新的hash
      [chunkhash] 同一个入口 生成的文件 chunkhash都是一样的
      [contenthash] 基于文件内容生成的，只要文件内容不变 不管多少次编译 contenthash都一样
      */
      filename:"css/[name].[hash].[chunkhash].[contenthash].css",
      // filename:'css/[name].css', // 把css提取出来 单独生成文件，并且在html中link引入
      // chunkFilename:'[id].css' // 代码块名字
    }),
    // 自动插入产出的文件，如果是多页应用 就多个new htmlWebpackPlugin
    new htmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html',
      minify:{
        removeAttributeQuotes:true, // 删除双引号
      },
      hash:true, // 会在引入资源的时候加入hash值，防止缓存导致不能更新
      chunks:['common','index'],//你将要向此html中插入的代码块的名次
      chunksSortMode:'manual', // 代码块插入的排序
      inject:true // 默认为true,默认插入
      /*
      <%
        for(var chunk in htmlWebpackPlugin.files.chunks){%>
          <script src="<%=htmlWebpackPlugin.files.chunks[chunk].entry%>"></script>
        <%}%>
      %>
      */
    }),
    new htmlInlineCssWebpackPlugin() // 内联css
  ],
  externals:{ // 引入不打包
    jquery:'jQuery'
  },
  devServer:{//开发服务器的配置
    hot:true,//启用热更新
    contentBase:path.resolve(__dirname,'dist'),//以它为静态文件根目录
    host:'localhost',
    compress:true, // 启动压缩
    port:8080,
    proxy:{
      '/api':{
        target:'localhost:3000',
        pathRewrite:{'/api':''}
      },
      // 前端只想单独模拟数据
      Before(app){
        app.get('/use',(req,res)=>{
          res.end('123')
        })
        //提供的方法钩子
      },
      // 有服务端 不想用代理来处理 想在服务器中启动webpack 端口用服务端端口webpack-dev-middleware
    }
  },
  resolve:{
    // 解析 代码中引入第三方包，查找的路径
    modules:[path.resolve('')],
    mainFields:[],
    extensions:['css','js','json'],//后缀 找不到就加上这些后缀找
    mainFiles:'',//l入口文件的名字
    alias:{//别名
      bootstrap:'bootstrap/dist/style.css',
      
    }
  },
  watch:true,
  watchOptions:{
    // 监控的选项
    poll:1000, // 每秒
    aggregateTimeOut: 500, //防抖
    ignored:/node_modules/ //不需要监控的文件
  },
  devtools:'cheap-module-eval-source-map'// 不会产生文件集成在打包后的文件中 不会产生列，会定位到行
  // devtools:'cheap-module-source-map' // 不会产生列 但是是一个单独的映射文件
//  devtools:'eval-source-map' // 不会产生单独的文件但是可以显示行和列
  // devtools:'sourcemap', // 源码映射 会单独生成一个sourcemap文件// 增加映射文件 可以帮助我们调试源代码  ,出错了会标识当前报错的列和行，大而全
  // context:path.resolve(__dirname), 上下文
  // chunk 是webpack在打包过程中的一个中间概念，用来实现代码的合并和分割
  // css 并非js 所以不能直接运行 需要loader转换器 可以把一个非js模块转成js模块
}

/*
cleanWepackPlugin 每次打包都清除上一次的文件 防止名称不一样一直存在
new CleanWebpackPlugin('./dist')
copyWebpackPlugin 某些文件也想打包，只是单独的copy，比如文档之类的
new CopyWebpackPlugin([
  {from:'doc',to:'./'}
])
bannerPlugin 内置的  版权
new webpack.BannerPlugin('xxx')
*/

/*
多入口
*/
var test = {
  entry:{
    home:'./src/home.js',
    other:'./src/other.js'
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new htmlWebpackPlugin({
      template:'./home.html',
      filename:'home.html',
      chunks:['home']
    }),
    new htmlWebpackPlugin({
      template:'./other.html',
      filename:'other.html',
      chunks:['other']
    })
  ]
}


/*
webpack 优化
1. noparse 忽略不需要的依赖
2. webpack内置ignorePlugin 忽略某些插件中不必要的引入
3. 动态连接库 避免打包后的文件过大 webpack中的DllPlugin 和DllReferencePlugin
4. 模块 happypack 实现多线程来打包

{
  test:/\.js$/,
  use:'Happypack/loader?id=js'
}
plugins:[
  new Happypack({
    id:'js',
    use:[
      loader:'babel-loader',
      options:{
        preset:[
          ...
        ]
      }
    ]
  })
]
5. import 在生产环境下 会自动去除没用的代码 tree-shaking 吧没用的代码自动删除掉
es6模块会吧结果放到fefault上，require 语法就会打包；

scope hosting  在webpack中会自动省略一些可以简化的代码
6. 抽取公共代码
entry:{
  index:'./src/index.js',
  other:'./src/other.js'
}
optimization:{
  splitChunks:{
    //分割代码块
    cacheGroups:{
      //缓存组
      common:{
        //公共的模块
        minSize:0, //  大小超过0个字节被引用
        minChunks:0, // 被引用次数超过0次以上
        chunks:'initial'
      },
      vendor:{ // 第三方插件 抽离公共代码
        priority:1,//权重
        test:/node_modules/,
        minSize:0,
        minChunks:0, 
        chunks:'initial'
      }
    }
  }
}
7. 懒加载 jsonp实现懒加载
es6草案语法import().then promise
*/