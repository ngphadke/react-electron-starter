module.exports = {
    // The entry point for the bundling. 
    // Whatever this file imports gets bundled as well.
    entry: "./src/index.js",

    // Include Babel in the build process using the it's webpack loader/ 
    // Exclude the node_modules folder
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    // Include all js (except the already excluded ones)
    resolve: {
        extensions: ['*', '.js']
    },

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