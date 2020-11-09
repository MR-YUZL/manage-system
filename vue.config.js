const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: "<url>",
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   }
  // },
  configureWebpack: {
    // webpack 配置
    devtool: "source-map",
    mode: 'development',
    plugins: [
      new VueLoaderPlugin()
    ],
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    },
    module: {
      rules: [{
          test: /\.vue$/,
          use: ['vue-loader'],
        },
        {
          test: /\.less$/,
          use: ['css-loader', 'less-loader']
        }, {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    }
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
};