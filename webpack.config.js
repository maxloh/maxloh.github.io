const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './assets/dev/js/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './assets/js/'),
    },
    optimization: {
        minimizer: [new TerserPlugin({ sourceMap: true })],
    },
    mode: 'production',
    devtool: 'source-map'
};