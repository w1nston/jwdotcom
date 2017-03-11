const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const env = process.env.NODE_ENV;

const resolve = {
  modules: ['node_modules'],
  extensions: ['.js', '.json', '.jsx'],
  alias: {
    logger: path.join(__dirname, '../src/shared/logger.js'),
  },
};

const moduleRules = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    },
  ],
};

const commonConfig = config =>
  Object.assign({}, config, { resolve, module: moduleRules });

const clientConfig = {
  context: path.join(__dirname, '../src/client'),
  entry: {
    bundle: ['babel-polyfill', './index.jsx'],
  },
  plugins: [new webpack.optimize.OccurrenceOrderPlugin()],
  output: {
    filename: env === 'dev' ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, '../public/assets/javascript'),
    pathinfo: env === 'dev',
  },
};

const serverConfig = {
  context: path.join(__dirname, '../src'),
  entry: {
    server: ['babel-polyfill', './server/server.js'],
  },
  plugins: [],
  output: {
    filename: env === 'dev' ? '[name].js' : '[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  target: 'node',
  externals: nodeExternals(),
};

if (env === 'dev') {
  clientConfig.devtool = 'cheap-module-source-map';
  serverConfig.plugins.push(
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    })
  );
}

module.exports = [serverConfig, clientConfig].map(commonConfig);
