const path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  glob = require('glob'),
  PurifyCSSPlugin = require('purifycss-webpack'),
  WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
  performance: {
    hints: false
  },
  entry: './src/js/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: '/images',
            limit: 5 * 1024
          },
        }
      },
      {
        test: /\.html$/,
        use: [{
            loader: 'file-loader',
            options: {
              name: "[name].html"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "html-loader",
            options: {
              interpolate: 'require',
              minimize: true,
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    new CopyWebpackPlugin([{
      from: "src/static",
      to: "static",
    }]),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src/html/*.*'))
    }),
    new ExtractTextPlugin("css/[name].css"),
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    host: 'localhost',
    overlay: true,
    compress: true
  }
}