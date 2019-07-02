const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './assets/dev/js/main.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './assets/js/'),
    },
    optimization: {
        minimizer: [new TerserPlugin({
            sourceMap: true,
            terserOptions: {
                mangle: { reserved: ['css'] }
            },
        })],
    },
    mode: 'production',
    devtool: 'source-map'
};