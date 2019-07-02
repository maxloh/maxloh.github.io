const path = require('path');

module.exports = {
    entry: './assets/dev/js/app.js',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, './assets/js/'),
    },
    mode: 'production',
    devtool: 'source-map'
};