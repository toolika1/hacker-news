const path = require("path");
const externals = require("webpack-node-externals");

module.exports = {
  entry: "./server/index.js",
  externals: [externals()],
  output: { filename: "index.js", path: path.resolve("server-build") },
  module: {
    rules: [
      { test: /\.css$/, use: "css-loader" },
      { test: /\.js$/, use: "babel-loader" },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              localIdentName: "[local]___[hash:base64:5]",
              modules: true,
              sourceMap: true,
            },
          },
          { loader: "less-loader" },
        ],
      },
    ],
  },
  target: "node",
};
