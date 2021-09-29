const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: "./dist/index.js",
  mode: "development",
  target: ["node", "es2020"],
  externals: [nodeExternals()],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "out"),
  },
  resolve: {
    extensions: [".js"],
    modules: ['node_modules'],
    alias: {
      src: path.resolve(__dirname, "dist"),
    },
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "src/public"), to: "public" },
      ],
    }),
  ],
};