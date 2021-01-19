const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemarkHTML = require("remark-html");

module.exports = {
  entry: ['./src/js/app.js', './src/scss/style.scss'],
  mode: 'production',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, './assets/js/'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader', options: {
              sourceMap: true,
              includePaths: ['node_modules']
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.md$/,
        use: [
          'html-loader',
          {
            loader: "remark-loader",
            options: {
              remarkOptions: {
                plugins: [RemarkHTML],
              },
            },
          },
        ]
      },
      {
        test: /\.(png|gif|svg)$/,
        use: 'url-loader'
      },
      // {
      //   test: /\.(woff2)$/,
      //   use: 'file-loader'
      // }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/style.css'
    })
  ]
};