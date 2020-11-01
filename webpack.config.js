const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // The entry point for the bundling. 
    // Whatever this file imports gets bundled as well.
    entry: "./src/index.jsx",

    // Include Babel in the build process using the it's webpack loader/ 
    // Exclude the node_modules folder
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    // Include all js (except the already excluded ones)
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },

    // Bundle everything to a folder in the project named dist
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin()
    ],

    // Serve from the dist folder
    devServer: {
        contentBase: './dist'
    }
}