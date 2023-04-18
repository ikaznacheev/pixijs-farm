const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, `./src/index.ts`),
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: `pixi-test-game`,
      template: path.resolve(__dirname, `./src/index.html`),
      filename: "index.html",
      inject: "body",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
    usedExports: true,
    sideEffects: true,
  }
};
