const path = require('path')


function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('views', resolve('src/views'))
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .end()
  },
  configureWebpack: {
    // webpack 配置
    devtool: "source-map",
    mode: 'development',
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    },
  },
  lintOnSave: false,
  devServer: {
    host: "0.0.0.0",
    port: "9200", //代理端口
    open: false, //项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    disableHostCheck: true, //穿透 如果不配置，穿透不了
    proxy: {
      ".*": {
        // target: "http://192.168.1.181:8082",
        target: "http://hfw.test.com", //回头配置开发本地地址
        changeOrigin: true,
        ws: false
      }
    }
  },
  publicPath: "/",
  outputDir: "cloud-qf-service",
  assetsDir: "static",
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px", //需要转换的单位
            viewportWidth: 1440, //设计稿的视口宽度
            unitPrecision: 3, //转化精度
            propList: [  //能转化为vw的属性列表
              "*"
            ],
            viewportUnit: "vw",  //希望使用的视口单位
            fontViewportUnit: "vw",  //字体使用的视口单位
            selectorBlackList: ['vux', 'weui'],//需要忽略的css选择器
            minPixelValue: 1, //最小转化数值
            mediaQuery: false,//媒体查询里的单位是否转换单位
            replace: true,//转换后是否添加备用单位
            exclude: /(\/|\\)(node_modules)(\/|\\)/, //忽略文件目录
          })
        ]
      }
    }
  },
};