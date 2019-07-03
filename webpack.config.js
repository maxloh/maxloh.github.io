const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: ['./assets/dev/js/app.js', './assets/dev/scss/style.scss'],
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, './assets/js/'),
    },
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.scss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {}
                    },
                    {
                        loader: 'css-loader',
                        options: {}
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {}
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sourceMapContents: false
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