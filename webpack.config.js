const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemarkHTML = require('remark-html');

module.exports = {
  mode: 'production',
  entry: ['./src/js/app.js', './src/scss/style.scss'],
  output: {
    path: path.resolve('./assets/js/'),
    filename: 'app.bundle.js',
    environment: {
      arrowFunction: false,
      destructuring: false,
      forOf: false
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          // \\ for Windows, / for Mac OS and Linux
          /node_modules[\\/]core-js/,
          /node_modules[\\/]webpack[\\/]buildin/,
          /node_modules[\\/]github-buttons/
        ],
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
            loader: 'remark-loader',
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
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    port: 80,
    open: true
  },
  plugins: [new MiniCssExtractPlugin({ filename: '../css/style.css' })]
};
