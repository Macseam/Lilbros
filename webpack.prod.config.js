let webpack = require("webpack");
let ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = require('./webpack.config.js');    // inherit from the main config file

// disable the hot reload
module.exports.entry = [
  'babel-polyfill',
  __dirname + '/' + module.exports.app_root + '/index.js'
];

// production env
module.exports.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    }
  })
);

// compress the js file
module.exports.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
    compressor: {
      warnings: false
    }
  })
);

// export css to a separate file
module.exports.module.loaders = [
  {
    test: /\.js$/,
    loaders: ['react-hot', 'babel'],
    exclude: /node_modules/,
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('css!sass'),
  },
  {
    test: /\.css$/,
    loaders: ['style', 'css'],
  }, {
    test: /\.less$/,
    loader: 'style-loader!css-loader!less-loader'
  }, {
    test: /\.woff$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff'
  }, {
    test: /\.woff2$/,
    loader: 'url-loader?limit=10000&minetype=application/font-woff'
  }, {
    test: /\.ttf$/,
    loader: 'file-loader'
  }, {
    test: /\.eot$/,
    loader: 'file-loader'
  }, {
    test: /\.svg$/,
    loader: 'file-loader'
  }, {
    test: /\.png$/,
    loader: 'file-loader'
  }
];

module.exports.plugins.push(
  new ExtractTextPlugin('../css/main.css')
);
