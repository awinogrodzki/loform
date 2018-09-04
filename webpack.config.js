const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
  entry: {
    index: ['./src/index'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  externals: [nodeExternals({ whitelist: ['uuid', 'debounce'] })],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
};

module.exports = config;
