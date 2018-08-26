
// const path = require('path');

// module.exports = {
//     context: __dirname,
//     entry: './app.js',
//     output: {
//         path: path.resolve(__dirname),
//         filename: 'bundle.js'
//     },
//     resolve: {
//         extensions: ['.js', '.jsx', '*']
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.jsx?$/,
//                 exclude: /(node_modules)/,
//                 use: {
//                     loader: 'babel-loader',
//                     query: {
//                         presets: ['env', 'react']
//                     }
//                 },
//             }
//         ]
//     },
//     devtool: 'source-map'
// };