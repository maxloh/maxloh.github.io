const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: ['./assets/dev/js/app.js', './assets/dev/scss/style.scss'],
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, './assets/js/'),
    },
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { map: { inline: false } } })],
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    { loader: 'sass-loader', options: { sourceMap: true, sourceMapContents: false } }
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