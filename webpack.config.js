const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './assets/dev/js/app.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, './assets/js/'),
  },
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  plugins: [
    new webpack.BannerPlugin('Copyright (c) 2019 Loh Ka Hong. All rights reserved.'),
    new MiniCssExtractPlugin({ filename: '../css/style.css' }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
            options: { url: false }
          },
          {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              sourceMap: true,
              plugins: [ // postcss plugins, can be exported to postcss.config.js
                require('autoprefixer'),
                require('cssnano')()
              ]
            }
          },
          'sass-loader' // compiles Sass to CSS
        ]
      }
    ]
  }
};