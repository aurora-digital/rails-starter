// In case we use some dependency that needs transpiling
// to work in older browsers for example, add it here!
const dependenciesToTranspile = [];
const nodeModules = new RegExp(
  `node_modules/(${dependenciesToTranspile.join("|")}).*`
);

module.exports = {
  test: /\.js$/,
  include: [nodeModules],
  loader: "babel-loader",
};
