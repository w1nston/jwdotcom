const webpack = require('webpack');
const path = require('path');

module.exports = env => ({
  context: path.join(__dirname, '../src'),
  entry: {
    blog: [
      'babel-polyfill',
      './assets/javascript/blog/entry.jsx',
    ],
    home: [
      'babel-polyfill',
      './assets/javascript/home/entry.jsx',
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  output: {
    filename: env.prod ? '[name].[hash].js' : '[name].js',
    path: path.resolve(__dirname, '../public/assets/javascript'),
    pathinfo: !env.prod,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
  },
});
