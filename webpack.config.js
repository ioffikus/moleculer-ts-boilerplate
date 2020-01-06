const path = require('path');
const { NODE_ENV = 'production' } = process.env;
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    /** ACCOUNTS */
    'accounts/accounts.service': './src/nodes/accounts/services/accounts/accounts.service.ts',
    // eslint-disable-next-line
    'accounts/accounts-history.service': './src/nodes/accounts/services/accountsHistory/accounts-history.service.ts',
    // eslint-disable-next-line
    'accounts/activity-timer.service':'./src/nodes/accounts/services/activityTimer/activity-timer.service.ts',
    'accounts/tokens.service': './src/nodes/accounts/services/tokens/tokens.service.ts',

    /** BILLING */
    'billing/best2pay.service': './src/nodes/billing/services/best2pay/best2pay.service.ts',
    'billing/advcash.service': './src/nodes/billing/services/advcash/advcash.service.ts',
    'billing/currencies.service': './src/nodes/billing/services/currencies/currencies.service.ts',
    'billing/payments.service': './src/nodes/billing/services/payments/payments.service.ts',
    'billing/profits.service': './src/nodes/billing/services/profits/profits.service.ts',
    'billing/wallets.service': './src/nodes/billing/services/wallets/wallets.service.ts',
    'billing/profits-passports.service':
      './src/nodes/billing/services/profits-passports/profits-passports.service',
    'billing/payment-timers.service':
      './src/nodes/billing/services/payment-timers/payment-timers.service.ts',

    /** E-COMMERCE */
    // eslint-disable-next-line
    'ecommerce/categories.service': './src/nodes/ecommerce/services/categories/categories.service.ts',
    'ecommerce/fields.service': './src/nodes/ecommerce/services/fields/fields.service.ts',
    'ecommerce/products.service': './src/nodes/ecommerce/services/products/products.service.ts',
    'ecommerce/suppliers.service': './src/nodes/ecommerce/services/suppliers/suppliers.service.ts',
    'ecommerce/orders.service': './src/nodes/ecommerce/services/orders/orders.service.ts',

    /** HELPERS **/
    'helpers/files.service': './src/nodes/helpers/services/files/files.service.ts',
    'helpers/confirmSMS.service': './src/nodes/helpers/services/confirm-sms/confirm-sms.service.ts',

    /** INTEGRATION */
    'integration:okmr-crm.service': './src/nodes/integration/okmr-crm/okmr-crm.service.ts',
    'integration:okmr-im.service': './src/nodes/integration/okmr-im/okmr-im.service.ts',
    'integration:npow-im.service': './src/nodes/integration/npow-im/npow-im.service.ts',

    /** LOCATIONS */
    'locations/cities.service': './src/nodes/locations/services/cities/cities.service.ts',
    'locations/countries.service': './src/nodes/locations/services/countries/countries.service.ts',
    'locations/regions.service': './src/nodes/locations/services/regions/regions.service.ts',

    /** NOTIFICATIONS */
    'notifications/sms.service': './src/nodes/notifications/services/sms/sms.service.ts',

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
