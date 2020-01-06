const path = require('path');
const { NODE_ENV = 'production' } = process.env;
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    /** USERS */
    'users/accounts.service': './src/nodes/users/services/accounts/accounts.service.ts',

    /** REST */
    // eslint-disable-next-line
    'rest-gateway/rest-gateway.service': './src/nodes/rest-gateway/services/rest-gateway.service.ts',

    /** GLOBAL CONFIG */
    'moleculer.config': './src/moleculer.config.ts',
  },
  optimization: {
    minimize: false,
    concatenateModules: false,
  },
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: `.env.production`,
      systemvars: true,
    }),
  ],
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
