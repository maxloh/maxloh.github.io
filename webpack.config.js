const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './assets/dev/js/app.js',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, './assets/js/'),
    },
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.BannerPlugin('Copyright (c) 2019 Loh Ka Hong. All rights reserved.')
    ]
};