const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
            presets: [['@babel/preset-env', { targets: "defaults" }]]
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
              includePaths: ["node_modules"]
            }
          }
        ]
      },
      {
        test: /\.(png|gif|svg)$/,
        use: [{
          loader: 'url-loader',
        }]
      },
      {
        test: /\.(woff2)$/,
        use: [{
          loader: 'file-loader',
        }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/style.css"
    })
  ]
};