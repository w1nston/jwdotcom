const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const clientConfig = {
  context: path.join(__dirname, '../src/client'),
  devtool: 'cheap-module-source-map',
  entry: {
    bundle: ['babel-polyfill', './index.jsx'],
  },
  plugins: [new webpack.optimize.OccurrenceOrderPlugin()],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../public/assets/javascript'),
    pathinfo: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      logger: path.join(__dirname, '../src/shared/logger.js'),
    },
  },
};

const serverConfig = {
  context: path.join(__dirname, '../src'),
  entry: {
    server: ['babel-polyfill', './server/index.js'],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  target: 'node',
  externals: nodeExternals(),
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      logger: path.join(__dirname, '../src/shared/logger.js'),
    },
  },
};

module.exports = [serverConfig, clientConfig];
