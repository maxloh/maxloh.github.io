const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ['./assets/dev/js/main.js', './assets/dev/scss/style.scss'],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './assets/js/'),
    },
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                "css-loader",
                {
                    loader: 'resolve-url-loader',
                    options: {}
                },
                "sass-loader"
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "assets/css/style.css",
        })
    ]
};