const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { spawn } = require('child_process')

const defaultInclude = path.resolve(__dirname, 'src')

module.exports = {
    // Include Babel in the build process using it's webpack loader/ 
    // Exclude the node_modules folder
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{ loader: 'babel-loader' }],
                include: defaultInclude
              },
        ]
    },

    target: 'electron-renderer',

    plugins: [
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
          })
    ],
    devtool: 'cheap-source-map',
    // Serve from the dist folder
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        //Set the electron . command to run before the dev server starts
        before(){
            spawn(
                'electron',
                ['.'],
                { shell: true, env: process.env, stdio: 'inherit'}
            )
            .on('close', code => process.exit(0))
            .on('error', spawnError => console.error(spawnError))
        }
    }
}