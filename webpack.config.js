let path = require('path');
let webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './js/index.js',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'babel-loader',
                query:{
                    presets:['es2015']
                }
            }],
        }]
    },
    output: {
        path: path.resolve(__dirname, './src'),
        filename: 'app.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: true }),
    ],
};