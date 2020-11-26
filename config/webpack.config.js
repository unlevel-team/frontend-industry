const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    // index: './src/index.js',
    index: { import: './src/index.js', dependOn: 'shared' },
    // another: './src/another-module.js',
    // another: { import: './src/another-module.js', dependOn: 'shared' },
    shared: ['lit-html', 'rxjs', 'html-entities'],
  },
  output: {
    // filename: '[name].[contentHash].bundle.js',
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    // publicPath: '/frontend-industry'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          // 'style-loader', // conflict with MiniCssExtractPlugin !!!
          // 'css-loader',
          { 
            loader: 'css-loader', 
            options: { 
              url: (url, resourcePath) => {
                // resourcePath - path to css file
    
                if (url.includes('.woff2')) { // Don't handle `.woff2` urls
                  return false;
                }

                if (url.includes('.svg')) { // Don't handle `.svg` urls
                  return false;
                }

                if (url.includes('.png')) { // Don't handle `.png` urls
                  return false;
                }
    
                return true;
              },
            }
          },
        ],
      },
    ],
  },
  optimization: {
    realContentHash: true,
    runtimeChunk: true,
    // splitChunks: {
    //   // include all types of chunks
    //   chunks: 'all'
    // }
  },
  watch: true,  // Build and watch for file changes
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
    ignored: ['dist/**/*.js', 'node_modules/**']
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 9000,
    // contentBasePublicPath: 'frontend-industry/',
    historyApiFallback: true,
    hot: true,
    writeToDisk: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Frontend industry',
      template: `${path.resolve(__dirname, '../public')}/index.webpack.template.html`
    }), // Generates default index.html
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // filename: devMode ? '[name].css' : '[name].[contenthash].css',
      // chunkFilename: devMode ? '[id].css' : '[id].[contenthash].css',
      filename: '[name].[contenthash].css',
      // chunkFilename: '[id].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, '../src/assets/fonts'),
          to: path.resolve(__dirname, '../dist/assets/fonts'),
        },
        { 
          from: path.resolve(__dirname, '../public/libs'),
          to: path.resolve(__dirname, '../dist/libs'),
        },
        { 
          from: path.resolve(__dirname, '../src/assets/config.json'),
          to: path.resolve(__dirname, '../dist/assets/config.json'),
        },
        { 
          from: path.resolve(__dirname, '../src/assets/data'),
          to: path.resolve(__dirname, '../dist/assets/data'),
        },
        { 
          from: path.resolve(__dirname, '../src/assets/images'),
          to: path.resolve(__dirname, '../dist/assets/images'),
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
};