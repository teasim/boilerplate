const resolve = require("path").resolve;
const pullAll = require("./utils/pullAll");
const uniq = require("./utils/uniq");

const TeasimBoilerplate = {
  version: "0.0.1",
  dllPlugin: {
    defaults: {
      exclude: ["chalk", "compression", "cross-env", "express", "ip", "minimist"],
      include: ["core-js", "eventsource-polyfill", "babel-polyfill"],
      path: resolve("../node_modules/teasim-boilerplate-dlls")
    },

    entry(pkg) {
      const dependencyNames = Object.keys(pkg.dependencies);
      const exclude = pkg.dllPlugin.exclude || TeasimBoilerplate.dllPlugin.defaults.exclude;
      const include = pkg.dllPlugin.include || TeasimBoilerplate.dllPlugin.defaults.include;
      const includeDependencies = uniq(dependencyNames.concat(include));

      return {
        TeasimBoilerplateDeps: pullAll(includeDependencies, exclude)
      };
    }
  }
};

module.exports = TeasimBoilerplate;
