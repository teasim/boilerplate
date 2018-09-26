const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const OptimizeUglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OfflinePlugin = require("offline-plugin");
const pkg = require("../../package.json");
const vendors = pkg.dependencies;

process.traceDeprecation = true;
process.noDeprecation = true;

const cdn = {
  Moment: `https://unpkg.com/moment@${vendors["moment"]}/min/moment.min.js`,
  Immutable: `https://unpkg.com/immutable@${vendors["immutable"]}/dist/immutable.min.js`,
  PropTypes: `https://unpkg.com/prop-types@${vendors["prop-types"]}/prop-types.min.js`,
  React: `https://unpkg.com/react@${vendors["react"]}/umd/react.production.min.js`,
  ReactDOM: `https://unpkg.com/react-dom@${vendors["react-dom"]}/umd/react-dom.production.min.js`,
  ReactRouter: `https://unpkg.com/react-router@${vendors["react-router"]}/umd/react-router.min.js`,
  ReactRouterDOM: `https://unpkg.com/react-router-dom@${vendors["react-router-dom"]}/umd/react-router-dom.min.js`,
  Redux: `https://unpkg.com/redux@${vendors["redux"]}/dist/redux.min.js`,
  ReduxSaga: `https://unpkg.com/redux-saga@${vendors["redux-saga"]}/dist/redux-saga.min.js`,
  Teasim: `https://unpkg.com/teasim@${vendors["teasim"]}/umd/teasim.min.js`
};

const plugins = [
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  })
];

module.exports = require("./webpack.base.babel")({
  mode: "production",
  entry: [path.join(process.cwd(), "app/index.js")],
  output: {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].chunk.js"
  },
  plugins: [
    
    new HtmlWebpackPlugin({
      template: "app/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    new HtmlWebpackPlugin({
      template: "app/index.html",
      filename: "404.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "moment",
          entry: cdn.Moment,
          global: "moment"
        },
        {
          module: "immutable",
          entry: cdn.Immutable,
          global: "Immutable"
        },
        {
          module: "prop-types",
          entry: cdn.PropTypes,
          global: "PropTypes"
        },
        {
          module: "react",
          entry: cdn.React,
          global: "React"
        },
        {
          module: "react-dom",
          entry: cdn.ReactDOM,
          global: "ReactDOM"
        },
        {
          module: "react-router",
          entry: cdn.ReactRouter,
          global: "ReactRouter"
        },
        {
          module: "react-router-dom",
          entry: cdn.ReactRouterDOM,
          global: "ReactRouterDOM"
        },
        {
          module: "redux",
          entry: cdn.Redux,
          global: "Redux"
        },
        {
          module: "redux-saga",
          entry: cdn.ReduxSaga,
          global: "ReduxSaga"
        }
      ]
    }),

    new OfflinePlugin({
      relativePaths: false,
      publicPath: "/",
      excludes: [".htaccess.bin"],
      externals: [cdn.Moment, cdn.Immutable, cdn.PropTypes, cdn.React, cdn.ReactDOM, cdn.ReactRouter, cdn.ReactRouterDOM, cdn.Redux, cdn.ReduxSaga],
      caches: {
        main: [":rest:"],
        additional: ["*.chunk.js"]
      },
      ServiceWorker: {
        prefetchRequest: {
          credentials: "include"
        }
      },
      safeToUseOptionalCaches: true,
      AppCache: false
    })
  ],
  optimization: {
    minimizer: [
      new OptimizeUglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          parser: require("postcss-safe-parser"),
          discardComments: { removeAll: true },
          autoprefixer: false
        },
      })
    ]
  },
  performance: {
    assetFilter: assetFilename => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)
  }
});
