const path = require('path');
const webpack = require("webpack");
const merge = require('webpack-merge');
const HotModuleReplacementPlugin = require('react-hot-loader');
const baseConfig = require('./build/webpack.base');
const buildConfig = require('./build/build.config');

const config = {
    devtool: 'cheap-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: "style-loader"
                    }, 
                    {
                        loader: "css-loader"
                    }, 
                    {
                        loader: "less-loader"
                    }
                ]
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif|ico|mp4|webm)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1,
                            name: "img/[name].[ext]?[hash]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
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
}

const webpackConfig = merge(baseConfig, buildConfig, config);

module.exports = webpackConfig;
