const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
  mode = 'production'
}
console.log(mode)

module.exports = {
  mode: mode,
  target: mode === 'development' ? 'web' : 'node',
  entry: {
    common: './src/js/common.js',
    index: './src/js/index.js',
    user: './src/js/user.js'
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  devtool: 'source-map',
  optimization: {
    emitOnErrors: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: "src/index.pug",
      chunks: ['common', 'index']
    }),
    new HtmlWebpackPlugin({
      filename: 'user.html',
      template: "src/user.pug",
      chunks: ['common', 'user']
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          (mode === 'development')
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap:  mode === 'development',
              sassOptions: {
                outputStyle:  (mode === 'development') ? null : "compressed",
              },
            },
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        dependency: {
          not: 'src/icons'
        },
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
}
