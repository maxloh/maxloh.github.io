const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './assets/dev/js/app.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, './assets/js/'),
  },
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  plugins: [
    new webpack.BannerPlugin('Copyright (c) 2019 Loh Ka Hong. All rights reserved.')
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          'style-loader', // inject CSS to page
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
            options: { url: false }
          },
          {
            loader: 'postcss-loader', // Run postcss actions
            options: {
              plugins: function () { // postcss plugins, can be exported to postcss.config.js
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          'sass-loader' // compiles Sass to CSS
        ]
      }
    ]
  }
};