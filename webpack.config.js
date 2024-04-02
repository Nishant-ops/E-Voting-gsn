const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  resolve: {
    fallback: {
      zlib: require.resolve("browserify-zlib"),
      https: require.resolve("https-browserify"),
    },
  },
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.join(__dirname, "/build"), // the bundle output path
    filename: "bundle.js",
    publicPath: "/", // the name of the bundl
  },

  plugins: [
    new NodePolyfillPlugin(),
    // new MiniCssExtractPlugin(),
    // new HtmlWebpackPlugin({
    //   template: "src/index.html", // to import index.html file inside index.js
    // }),
    // // new CompressionPlugin({
    //   algorithm: "gzip",
    //   test: /\.js$|\.css$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
    // new MiniCssExtractPlugin(),
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     // Enable progressive JPEGs
    //     mozjpeg: {
    //       progressive: true,
    //       quality: 65,
    //     },
    //     // Disable PNG optimization
    //     optipng: {
    //       enabled: false,
    //     },
    //     // Set the maximum number of concurrent image optimizations
    //     concurrency: 6,
    //     // Disable gifsicle interlacing
    //     gifsicle: {
    //       interlaced: false,
    //     },
    //     // Enable svgo optimization
    //     svgo: {
    //       plugins: [{ removeViewBox: false }, { cleanupIDs: true }],
    //     },
    //   },
    // }),
    // new CompressionPlugin(),
    // new webpack.DefinePlugin({
    //   // <-- key to reducing React's size
    //   "process.env": {
    //     NODE_ENV: JSON.stringify("production"),
    //   },
    // }),
    // new webpack.optimize.DedupePlugin(), //dedupe similar code
    // new webpack.optimize.TerserPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
  ],
  devServer: {
    port: 3000,

    historyApiFallback: true, // you can change the port
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images",
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
};
