module.exports = {
    // The entry point. Whatever this file imports gets bundled as well.
    entry: "./src/index.js",

    // Bundle everything to a folder in the project named dist
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },

    // Serve from the dist folder
    devServer: {
        contentBase: './dist'
    }
}