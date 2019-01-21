var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var WebpackBuildNotifierPlugin = require('webpack-build-notifier')

const PATHS = {
  src: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build')
}

module.exports = {

  entry: {
    spaceInvaders: PATHS.src + '/Game.ts'
  },
  mode:'development',
  output: {
    path: PATHS.build,
    filename: '[name].js',
    library: 'SpaceInvaders',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      },

      {
        test: /\.(jpg|png|svg)$/,
        include: PATHS.src + "images",
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 25000
            }
          }
        ]
      },
      {
        test: /\.p?css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, url: false
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.js')
    extensions: [ '.ts', '.js', '.json' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack boilerplate',
      hash: true,
      filename: 'index.html',
      template: PATHS.src + '/index.html',
      scripts:['./demo.js']
    }),
    new WebpackBuildNotifierPlugin({
      title: 'My Project Webpack Build'
    })
  ]
}
