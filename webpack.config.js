const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const version = '20171102';
const serverHost = 'localhost';
const serverPort = '8888';

module.exports = {
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/dist/" + version,
        filename: "bundle.js"
    },
    resolve: {
        //自动扩展文件后缀名
        extensions: ['.js', '.less', '.png', '.jpg', '.gif'],
        //模块别名定义，方便直接引用别名
        // alias: {
        //   'react-router-redux': path.resolve(nodeModules, 'react-router-redux-fixed/lib/index.js'),
        // }
    },
    module: {
        rules: [{
            test: /\.(css|less)$/i,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader?sourceMap", "less-loader?sourceMap"]
            })
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'url-loader?name=' + version + '/images/[name].[ext]&limit=10'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                minimize: true,
                removeComments: true,
                removeScriptTypeAttributes: true,
                removeStyleTypeAttributes: true
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/src/index.html'
        }),
        new ExtractTextPlugin({
            filename: version + '/css/app.css',
            disable: false,
            allChunks: true
        }),
    ],
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: __dirname + '/dist',
        compress: true,
        //sourceMap: true,
        historyApiFallback: true,
        hot: false,
        inline: true,
        //grogress: true,
        host: serverHost,
        port: serverPort,
        watchContentBase: true,
        watchOptions: {
            poll: 500
        }
    },
    watch: true,
    watchOptions: {
        poll: 1000,
        ignored: /node_modules/
    }
}
