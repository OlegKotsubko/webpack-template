const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');
const CopyPlugin = require("copy-webpack-plugin");

const env = process.env.NODE_ENV
const isDevelopment = env !== 'production'
const pathToImageSource = isDevelopment ? "dist/assets/[name][ext][query]" : "assets/[name][ext][query]"

console.log(env)

const config = {
  target: isDevelopment ? 'web' : 'node',
  entry: {},
  output: {
    filename: 'js/[name].[contenthash].js',
    assetModuleFilename: pathToImageSource,
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
    new CopyPlugin({
      patterns: [
        {
          from: "src/favicons",
          to: "favicons"
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          (isDevelopment) ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap:  isDevelopment,
              sassOptions: {
                outputStyle:  isDevelopment ? null : "compressed",
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
        type: 'asset/inline',
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

// TODO remove hardcoded common javascript if it necessary
Object.assign(config.entry, {'common' :`./src/js/common.js`})

fs.readdirSync('src', {withFileTypes: true})
  .filter(item => !item.isDirectory())
  .map(item => item.name)
  .map(page => {
    const base = page.replace('.pug', '')
    const ifJsFleExist = fs.existsSync(`src/js/${base}.js`)

    if(ifJsFleExist) {
      Object.assign(config.entry, {[base]:`./src/js/${base}.js`})
    }

    config.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${base}.html`,
        template: `src/${page}`,
        chunks: ['common', ifJsFleExist ? base : null] // TODO remove hardcoded common dependency
      })
    );
  })

module.exports = config
