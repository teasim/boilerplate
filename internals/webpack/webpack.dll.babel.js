const { join } = require("path");
const defaultsDeep = require("../utils/defaultsDeep");
const webpack = require("webpack");
const pkg = require(join(process.cwd(), "package.json"));
const dllPlugin = require("../config").dllPlugin;

if (!pkg.dllPlugin) {
  process.exit(0);
}

const dllConfig = defaultsDeep(pkg.dllPlugin, dllPlugin.defaultsDeep);
const outputPath = join(process.cwd(), dllConfig.path);

module.exports = require("./webpack.base.babel")({
  mode: "development",
  context: process.cwd(),
  entry: dllConfig.dlls ? dllConfig.dlls : dllPlugin.entry(pkg),
  devtool: "eval",
  output: {
    filename: "[name].dll.js",
    path: outputPath,
    library: "[name]"
  },
  plugins: [
    new webpack.DllPlugin({ name: "[name]", path: join(outputPath, "[name].json") }) // eslint-disable-line no-new
  ],
  performance: {
    hints: false
  }
});
