const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
  optimization: {
    portableRecords: true
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
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/images/*.png',
        to: 'images', force: true
      } 
    ])
  ]
};