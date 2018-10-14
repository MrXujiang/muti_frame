const path = require('path');
const webpack = require("webpack");

const config = {
    entry: {
        vendor: ["babel-polyfill", "console-polyfill", "raf/polyfill", "react", "react-dom", "react-router-dom"]
    },
    output: {
        path: path.resolve(__dirname, '../../webapp/hunter'),
        publicPath: '',
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: [
            ".js", 
            ".css",
            ".less",
            ".scss", 
            ".png", 
            ".jpg", 
            ".jpeg", 
            ".gif",
            ".web.js",
            ".json"
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff)\S*$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'css/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
}

module.exports = config;
