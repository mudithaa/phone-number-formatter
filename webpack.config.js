const path = require('path');

module.exports = {
  entry: './src/index.js',
  resolve: {
    extensions: [ '.js' ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
      }
    ]
  }
};