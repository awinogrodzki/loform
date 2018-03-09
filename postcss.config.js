const webpack = require('webpack');
const path = require('path');

module.exports = {
  plugins: [
    require('postcss-import')({
      path: [ path.resolve(__dirname + '/src') ],
      addDependencyTo: webpack,
    }),
    require('postcss-cssnext'),
  ],
};
