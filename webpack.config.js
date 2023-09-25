const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        bundle: path.resolve(__dirname, 'app.js')
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: '[name].js',
        clean: true
    }
}