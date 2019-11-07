/* eslint-disable no-undef */
let path = require("path");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, { mode }) => {
  let production = mode === "production";

  return {
    entry: "./src/index.js",

    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "static/js/[name].bundle.js"
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          resolve: { extensions: [".js", ".jsx"] },
          use: {
            loader: "babel-loader"
          }
        },

        {
          test: /\.(sa|sc|c)ss$/,
          exclude: /\.module\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === "development",
                publicPath: "../../"
              }
            },
            { loader: "css-loader", options: { sourceMap: true } },
            {
              loader: "postcss-loader",
              options: { sourceMap: true }
            },
            {
              loader: "sass-loader",
              options: { sourceMap: true }
            }
          ]
        },

        {
          test: /\.module\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === "development",
                publicPath: "../../"
              }
            },
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: production
                    ? "[hash:base64:5]"
                    : "[name]__[local]--[hash:base64:5]"
                },
                sourceMap: true
              }
            },

            {
              loader: "postcss-loader",
              options: { sourceMap: true }
            },
            {
              loader: "sass-loader",
              options: { sourceMap: true }
            }
          ]
        },

        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "static/images/[name].[ext]"
              }
            }
          ]
        },

        {
          test: /\.(woff2?)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "static/fonts/[name].[ext]"
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin(),

      new HtmlWebpackPlugin({
        inject: true,
        favicon: "./public/favicon.ico",
        template: "./public/index.html"
      }),

      new MiniCssExtractPlugin({
        filename: "static/css/[name].bundle.css",
        ignoreOrder: false
      })
    ],

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: "initial"
          },
          //TODO splitChunks
          common: {
            name: "common",
            minChunks: 2,
            priority: -20,
            chunks: "all",
            reuseExistingChunk: false
          }
        }
      }
    },

    devtool: production ? false : "source-map",

    devServer: {
      historyApiFallback: true,
      overlay: true,
      port: 8081
    },

    resolve: {
      alias: {
        "~src": path.resolve(__dirname, "src"),
        "~pub": path.resolve(__dirname, "public")
      }
    }
  };
};
