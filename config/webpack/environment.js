/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const { environment } = require("@rails/webpacker");

const path = require("path");

const sharedConfig = {
  stats: {
    children: false,
  },

  resolve: {
    alias: {
      root: path.resolve("./frontend"),
    },
  },

  devServer: {
    clientLogLevel: "info",
  },

  // Fix for SSR when using async components
  output: {
    globalObject: "this",
  },
};

/**
 * Delete nodeModules default loader and replace with our own
 */
environment.loaders.delete("nodeModules");
environment.loaders.append("nodeModules", require("./loaders/nodeModules"));

environment.config.merge(sharedConfig);

module.exports = environment;
