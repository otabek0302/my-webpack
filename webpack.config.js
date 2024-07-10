const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const isDev = env.mode === "development";

  return {
    mode: env.mode || "development",
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      isDev && new webpack.ProgressPlugin(),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: "css/[name].[contenthash:8].css",
          chunkFilename: "css/[name].[contenthash:8].css",
        }),
      !isDev && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              //  if we add option we can use css file with module and can expor and inmport styles
              options: {
                modules: {
                  localIdentName: isDev
                    ? "[path][name]__[local]"
                    : "--[hash:base64:5]",
                },
                importLoaders: 1,
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    devtool: isDev ? "inline-source-map" : false,
    devServer: {
      static: {
        directory: path.join(__dirname, "build"),
      },
      compress: true,
      port: env.port || 3000,
      open: true,
      
      // this line analyzer open analyser page for see chunks
      analyzer: isDev ? false : true,
      
      // this line of code is working for dev mode
      historyApiFallback: true,
    },
  };
};
