const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      path: path.resolve(process.cwd(), "build"),
      publicPath: "/"
    },
    options.output
  ),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|\.git/,
        use: {
          loader: "babel-loader",
          options: options.babelQuery
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 2 }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [autoprefixer]
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              noIeCompat: true
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2|node)$/,
        use: "file-loader"
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1000
          }
        }
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.special\.json$/,
        type: "javascript/auto",
        use: "special-loader"
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000
          }
        }
      }
    ]
  },
  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.ProvidePlugin({
      fetch: "exports-loader?self.fetch!whatwg-fetch"
    }),
    new webpack.ContextReplacementPlugin(/\.\/locale$/, "empty-module", false, /js$/)
  ]),
  resolve: {
    modules: [path.resolve(process.cwd(), "app"), path.resolve(process.cwd(), "node_modules")],
    extensions: [".js", ".jsx", ".react.js"],
    mainFields: ["browser", "jsnext:main", "main"]
  },
  node: { fs: "empty" },
  devtool: options.devtool,
  target: "web",
  performance: options.performance || {}
});
