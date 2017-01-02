var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var WebpackBuildNotifierPlugin = require("webpack-build-notifier");


const PATHS = {
  src: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build')
};

module.exports = {

  entry: {
    app: PATHS.src + '/app.js'
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },


  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: 'url-loader',
        options: {
          limit: 25000
        },
        // An array of paths or an individual path
          include: PATHS.src + "images"
      },
      {
        test: /\.css/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: ['.ts', '.js', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack boilerplate',
      hash: true,
      filename: 'index.html',
      template: PATHS.src + '/index.html',
    }),
    new WebpackBuildNotifierPlugin({
      title: "My Project Webpack Build"
    })
  ]
};
