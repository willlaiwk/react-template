const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ENTRY_FILE = path.resolve(__dirname, 'src/main.tsx');
const DEV_OUTPUT_PATH = path.resolve(__dirname, 'public');
const PROD_OUTPUT_PATH = path.resolve(__dirname, 'dist');

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.json',
        },
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  target: 'web',
};

// Production config
const prodConfig = {
  mode: 'production',
  entry: {
    main: ENTRY_FILE,
  },
  output: {
    path: PROD_OUTPUT_PATH,
    filename: 'static/[name].[contenthash].js',
    publicPath: '',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new WebpackManifestPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
};

// Development config
const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: [ENTRY_FILE],
  },
  output: {
    path: DEV_OUTPUT_PATH,
    filename: 'static/[name].bundle.js',
    publicPath: '',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/[name].bundle.css',
      chunkFilename: '[id].css',
    }),
    new WebpackManifestPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};

module.exports = () =>
  process.env.NODE_ENV === 'development'
    ? { ...baseConfig, ...devConfig }
    : { ...baseConfig, ...prodConfig };
