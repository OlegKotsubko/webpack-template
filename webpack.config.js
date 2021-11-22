const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
  mode = 'production'
}
console.log(mode)

const config = {
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
    })
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

fs.readdirSync('src', {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => item.name)
  .map(page => {
    const base = page.replace('.pug', '')
    const ifJsfFleExist = fs.existsSync(`src/js/${base}.js`)
    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${base}.html`,
        template: `src/${page}`,
        chunks: ['common', ifJsfFleExist ? base : null]
      })
    );
  })

module.exports = config
