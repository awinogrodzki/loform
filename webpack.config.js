const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
  externals: [nodeExternals({ whitelist: ['classnames','uuid'] })],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.css',
    ]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css', { allChunks: true }),
  ],
};

module.exports = config;
