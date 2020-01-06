const merge = require('webpack-merge');
const WebpackShellPlugin = require('webpack-shell-plugin');
const baseConfig = require('./webpack.config.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = merge(baseConfig, {
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: `.env.development`,
      systemvars: true,
    }),
    new WebpackShellPlugin({
      onBuildEnd: ['npm run start:hot'],
    }),
  ],
});
