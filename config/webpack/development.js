process.env.NODE_ENV = process.env.NODE_ENV || "development";

const DotenvPlugin = require("dotenv-webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const environment = require("./environment");

environment.plugins.prepend("Dotenv", new DotenvPlugin());
environment.plugins.prepend(
  "BundleAnalyzer",
  new BundleAnalyzerPlugin({ openAnalyzer: false })
);
environment.plugins.prepend(
  "ReactRefresh",
  new ReactRefreshWebpackPlugin({
    overlay: { sockPort: environment.config.devServer.port },
  })
);

module.exports = environment.toWebpackConfig();
