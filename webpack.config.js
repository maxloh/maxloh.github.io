const path = require('path');
module.exports = {
    entry: '.\\assets\\dev\\js\\main.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, '.\\assets\\js\\'),
    }
};