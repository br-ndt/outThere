const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = dotenv.config({
  path: path.join(__dirname, "../../.env"),
}).parsed;

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output:
  {
      path: path.resolve(__dirname, 'public'),
      filename: 'build.js'
  },
  devServer: {
    proxy: {
      "/api": {
        target: `http://localhost:${env.APP_SERVER_PORT}`,
      },
      "/weather": {
        target: `http://localhost:${env.APP_SERVER_PORT}`,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": env.parsed,
    }),
  ],
};
