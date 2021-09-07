const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
// const BASE_URL = require("./public");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

// const smp = new SpeedMeasurePlugin();

// module.exports = smp.wrap(YourWebpackConfig);
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set("views", resolve("src/views"));
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .end();
  },
  configureWebpack: {
    // webpack 配置
    devtool: "source-map",
    mode: "development",
    resolve: {
      modules: [path.resolve(__dirname, "node_modules")],
      extensions: [".js", ".vue", ".json"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": resolve("src"),
      },
    },
    plugins: [
      // new webpack.HotModuleReplacementPlugin(),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/), //减小moment语言包体积
      new HtmlWebpackPlugin({
        //html编译插件
        template: "./public/index.html",
        // url: BASE_URL,
        title: "hfw",
      }),
      // new webpack.DllReferencePlugin({
      //   context: path.join(__dirname),
      //   manifest: require("./public/vue.manifest.json"),
      // }),
      // new AddAssetHtmlPlugin({
      //   filepath: path.resolve(__dirname, "./public/*.dll.js"),
      // }),
    ],
    optimization: {
      minimize: false,
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
          parallel: 4,
          terserOptions: {
            //Terser 压缩配置
            output: { comments: false },
          },
          extractComments: true,
        }),
      ],
    },
  },
  lintOnSave: false,
  devServer: {
    host: "0.0.0.0",
    port: "9200", //代理端口
    hot: true,
    open: false, //项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    disableHostCheck: true, //穿透 如果不配置，穿透不了
    proxy: {
      ".*": {
        // target: "http://192.168.1.181:8082",
        target: "http://127.0.0.1:3000", //回头配置开发本地地址
        changeOrigin: true,
        ws: false,
      },
    },
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
            propList: [
              //能转化为vw的属性列表
              "*",
            ],
            viewportUnit: "vw", //希望使用的视口单位
            fontViewportUnit: "vw", //字体使用的视口单位
            selectorBlackList: ["vux", "weui"], //需要忽略的css选择器
            minPixelValue: 1, //最小转化数值
            mediaQuery: false, //媒体查询里的单位是否转换单位
            replace: true, //转换后是否添加备用单位
            exclude: /(\/|\\)(node_modules)(\/|\\)/, //忽略文件目录
          }),
        ],
      },
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            "primary-color": "#1DA57A",
            "link-color": "#1DA57A",
            "border-radius-base": "2px",
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};
