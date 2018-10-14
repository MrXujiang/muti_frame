const path = require('path');
const webpackBase = require('./webpack.base');
const webpackMerge = require('webpack-merge');
const config = require('./config');

module.exports = webpackMerge(webpackBase, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(__dirname, '../src/styles/lib/main.scss'),
            }
          }
        ]
      },
      {
        test: /\.(js|vue)$/,
        enforce: 'pre', // 强制先进行 ESLint 检查
        exclude: /node_modules|lib/,
        loader: 'eslint-loader',
        options: {
          // 启用自动修复
          fix: true,
          // 启用警告信息
          emitWarning: true,
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/, // 处理图片
        use: {
          loader: 'file-loader', // 解决打包css文件中图片路径无法解析的问题
          options: {
            // 打包生成图片的名字
            name: '[name].[hash:8].[ext]',
            // 图片的生成路径
            outputPath: config.imgOutputPath,
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // 处理字体
        use: {
          loader: 'file-loader',
          options: {
            outputPath: config.fontOutputPath,
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: config.devServerOutputPath,
    overlay: {
      errors: true,
      warnings: true,
    },
    open: true, // 服务启动后 打开浏览器
    port: "80",
    hot: true,
    // open: true,
    compress: true,
    historyApiFallback: {
        index: '/signin.html'
    },
    watchOptions: {
        aggregateTimeout: 1000,
        ignored: /node_modules/
    },
    host: "0.0.0.0",
    proxy: {
        //"/wt/runner/hunter/bg/": "http://192.168.0.237:8081"  // zj
        // "/wt/runner/hunter/bg/": "http://192.168.0.205:8081"  //yk
        // "/wt/runner/hunter/bg/": "http://testht.wintalent.cn"  // 测试
        "/wt/runner/hunter/bg/": "http://rele.wintalent.cn"  // rele
    //  "/wt/runner/hunter/bg/": "http://win8.wintalent.cn"  // win8
    }
  }
});