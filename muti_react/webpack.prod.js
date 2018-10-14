const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
const merge = require('webpack-merge');
const baseConfig = require('./build/webpack.base');
const buildConfig = require('./build/build.config');

const extractLess = new ExtractTextPlugin({
    filename: "css/[name].css"
});

const config = {
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader",
                    publicPath: "../"
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: "img/[name].[ext]?[hash]"
                        }
                    },
                    // {
                    //     loader: 'image-webpack-loader',
                    //     options: {
                    //         progressive: true,
                    //         optimizationLevel: 7,
                    //         interlaced: false,
                    //         pngquant: {
                    //             quality: '65-90',
                    //             speed: 4
                    //         }
                    //     }
                    // }
                ]
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            uglifyOptions: {
                ecma: 5
            }
        }),
        extractLess,
        new CopyWebpackPlugin([
            {
                from: './public/favicon.ico',
                to: './favicon.ico'
            }
        ]),
        new webpack.optimize.OccurrenceOrderPlugin(),       //分配ID, 优先考虑使用最多的模块
        new webpack.optimize.AggressiveMergingPlugin()     //合并块
    ]
}

const webpackConfig = merge(baseConfig, buildConfig, config);

module.exports = webpackConfig;
