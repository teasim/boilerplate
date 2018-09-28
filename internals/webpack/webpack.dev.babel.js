const path = require("path");
const fs = require("fs-extra");
const glob = require("glob");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const logger = require("../../server/logger");
const pkg = require("../../package.json");
const dllPlugin = pkg.dllPlugin;

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    inject: true,
    template: "app/index.html"
  })
];

if (dllPlugin) {
  glob.sync(`${dllPlugin.path}/*.dll.js`).forEach(dllPath => {
    plugins.push(
      new AddAssetHtmlPlugin({
        filepath: dllPath,
        includeSourcemap: false
      })
    );
  });
}

process.traceDeprecation = true;
process.noDeprecation = true;

module.exports = require("./webpack.base.babel")({
  mode: "development",
  entry: [
    "eventsource-polyfill", // Necessary for hot reloading with IE
    "react-hot-loader/patch",
    "webpack-hot-middleware/client?reload=true",
    path.join(process.cwd(), "app/index.js")
  ],

  output: {
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },

  plugins: dependencyHandlers().concat(plugins), // eslint-disable-line no-use-before-define

  devtool: "eval-source-map",

  performance: {
    hints: false
  }
});

function dependencyHandlers() {
  if (process.env.BUILDING_DLL) {
    return [];
  }

  const dllPath = path.resolve(process.cwd(), dllPlugin.path || "node_modules/teasim-boilerplate-dlls");

  if (!dllPlugin.dlls) {
    const manifestPath = path.resolve(dllPath, "TeasimBoilerplateDeps.json");

    if (!fs.existsSync(manifestPath)) {
      logger.error("The DLL manifest is missing. Please run `npm run build:dll`");
      process.exit(0);
    }

    return [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(manifestPath) // eslint-disable-line global-require
      })
    ];
  }

  const dllManifests = Object.keys(dllPlugin.dlls).map(name => path.join(dllPath, `/${name}.json`));

  return dllManifests.map(manifestPath => {
    if (!fs.existsSync(path)) {
      if (!fs.existsSync(manifestPath)) {
        logger.error(`The following Webpack DLL manifest is missing: ${path.basename(manifestPath)}`);
        logger.error(`Expected to find it in ${dllPath}`);
        logger.error("Please run: npm run build:dll");

        process.exit(0);
      }
    }

    return new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(manifestPath) // eslint-disable-line global-require
    });
  });
}
