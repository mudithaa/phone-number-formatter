const path = require('path');
const webpack = require('webpack');

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
  },
  plugins: [
    new webpack.ProvidePlugin({
      libphonenumber: 'google-libphonenumber'
    })
    ]
};