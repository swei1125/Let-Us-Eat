
const path = require('path');

module.exports = {
  context: __dirname,
  entry: "./frontend/app/entry.jsx",
  output: {
    path: path.resolve(__dirname, "frontend", "public"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          query: {
            presets: ["env", "react"],
            plugins: ["emotion"]
          }
        }
      }
    ]
  },
  node: {
    fs: "empty",
    net: "empty"
  },
  devtool: "source-map"
};