const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ['./assets/dev/js/app.js', './assets/dev/scss/style.scss'],
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, './assets/js/'),
    },
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    { loader: 'sass-loader', options: {
                         sourceMap: true, 
                        sourceMapContents: false,
                        includePaths: ["node_modules"]
                    } }
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