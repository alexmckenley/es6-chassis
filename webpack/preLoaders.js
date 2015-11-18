'use strict';

const preLoaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
  },
];

module.exports = preLoaders;
