# My Minimal React Starter

## Background
I wanted to truly understand the behind the scenes magic that gets React apps working as I've always found Webpack, Babel to be incomprehensible. 

Additionally, as far as I've seen setting up minimal react with electron requires quite a bit of knowledge of the in's and out's of the ecosystem. This is primarily because the standard starter _`create_react_app`_ doesn't allow the `fs` node module which most electron apps would need to do anything worthwhile.
 
## Explanation (For Self)
The whole process can be broken into 4 main parts.

### Part 1 - Minimal Working JS App
In this first step, we create a simple NodeJS application that logs a message.
This is covered in the commit df32da2

* Init `npm` in the project (with defaults)
* Create a `src` folder with `index.js` (_which will later be our entry point_)
* Add a start script to `package.json` which runs the `index.js` file in node
 
### Part 2 - Minimal Webpack Setup
In the second step, we move towards a more realistic front-end focused setup with webpack to bundle our files and setup a `dist` folder to hold our build. This is covered in the commit 9db2de4

* Install `webpack`, `webpack-cli`, `webpack-dev` and `webpack-dev-server`
* Create `webpack.config.js` and add the following
    * An entry point file where other dependencies are specified.
    * An output directory in which the project will be built
    * Point the dev-server to that directory
* Change the start script to call webpack with the config above in development mode

### Part 3 - Add Babel to the Webpack Setup
In the third step, we add Babel to ensure we can support all syntaxes and flavors of Javascript by compiling everything into vanilla JS that all browsers can understand. This is used for example in React to transpile JSX files. 

This is done in commit 64aa9e3.

* Install the main Babel dependencies - `@babel/core` & `@babel/preset-env` along with a loader that plugs babel into webpack - `babel-loader`
    * `@babel/preset-env` enables use of the latest JS without micromanaging syntax transforms and browser polyfills based on the target environment.
* Add lines to respect babel packages in `package.json`
    * This can be abstracted out to a separate `.babelrc` file
* Add Babel into the webpack config
    * Ensure Babel covers all JS files but excludes the node_modules folder
    * Ensure the Webpack Babel loader is used

### Part 4 - React Setup

#### React with Babel
Let's configure Babel to correctly transpile React's JSX files.

* Install @babel/preset-react
* Configure `.babelrc` and add the babel preset
* Modify webpack config to ensure `.jsx` files are run through transpiling.

## Thanks To

This is largely based on following @rwieruch's Modern Javascript Setup tutorial series. Shoutout to @swyx for inspiring me to [Learn in Public](https://www.swyx.io/learn-in-public/)