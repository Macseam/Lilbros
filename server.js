let webpack = require('webpack');
let path = require('path');
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config');

console.log();

new WebpackDevServer(webpack(config),{publicPath: '/build/', historyApiFallback: true}).listen(8090, 'localhost', function (err, result) {
        if (err) {
            console.log(err);
        }

        console.log('Listening at localhost:8090');
    });