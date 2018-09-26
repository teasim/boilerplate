const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: false,
              importLoaders: 2
            }
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
        test: /\.css$/,
        include: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { modules: true, importLoaders: 1 }
          },
          { loader: "postcss-loader" }
        ]
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: "file-loader"
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              query: {
                name: "[name].[ext]"
              }
            }
          }
        ]
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
  resolve: {
    modules: [path.resolve(process.cwd(), "app"), path.resolve(process.cwd(), "node_modules")],
    extensions: [".js", ".jsx", ".react.js"],
    mainFields: ["browser", "jsnext:main", "main"]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /\.\/locale$/,
      "empty-module",
      false,
      /js$/
    )
  ]
};
