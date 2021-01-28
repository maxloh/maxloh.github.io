const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemarkHTML = require("remark-html");

module.exports = {
  entry: ['./src/js/app.js', './src/scss/style.scss'],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, './assets/js/')
  },
  mode: 'production',
  devtool: 'source-map',
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 80
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '../css/style.css' })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }]
            ]
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
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: { includePaths: ['node_modules'] }
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
              remarkOptions: { plugins: [RemarkHTML] }
            }
          }
        ]
      },
      {
        test: /\.(gif|png|svg)/,
        type: 'asset/inline'
      }
    ]
  }
};