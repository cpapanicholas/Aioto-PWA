const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/src/js/index.js', // Updated entry path
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client', 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html', // Updated template path
      favicon: './client/src/favicon.ico', // Updated favicon path
    }),
    new WebpackPwaManifest({
      name: 'J.A.T.E',
      short_name: 'J.A.T.E',
      description: 'Just Another Text Editor',
      background_color: '#ffffff',
      theme_color: '#31a9e1',
      start_url: '/',
      icons: [
        {
          src: './client/src/images/logo.png',
          sizes: [96, 128, 192, 256, 384, 512],
        },
      ],
    }),
    new InjectManifest({
      swSrc: './client/src-sw.js',
      swDest: 'sw.js',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};