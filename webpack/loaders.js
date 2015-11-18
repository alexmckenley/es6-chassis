'use strict';

const path = require('path');
const pkg = require('../package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEBUG = process.env.NODE_ENV === 'development';
const TEST = process.env.NODE_ENV === 'test';

let jsxLoader;
let sassLoader;
let cssLoader;
const fileLoader = 'file-loader?name=[path][name].[ext]';
const htmlLoader = [
  'file-loader?name=[path][name].[ext]',
  'template-html-loader?' + [
    'raw=true',
    'engine=lodash',
    'version=' + pkg.version,
    'title=' + pkg.name,
    'debug=' + DEBUG,
  ].join('&'),
].join('!');
const jsonLoader = ['json-loader'];

const sassParams = [
  'outputStyle=expanded',
  'includePaths[]=' + path.resolve(__dirname, '../app/scss'),
  'includePaths[]=' + path.resolve(__dirname, '../node_modules'),
];


if (DEBUG || TEST) {
  jsxLoader = [];
  if (!TEST) {
    jsxLoader.push('react-hot');
  }
  jsxLoader.push('babel-loader?optional[]=runtime&stage=0&plugins=rewire');
  sassParams.push('sourceMap', 'sourceMapContents=true');
  sassLoader = [
    'style-loader',
    'css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
    'postcss-loader',
    'sass-loader?' + sassParams.join('&'),
  ].join('!');
  cssLoader = [
    'style-loader',
    'css-loader?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]',
    'postcss-loader',
  ].join('!');
} else {
  jsxLoader = ['babel-loader?optional[]=runtime&stage=0&plugins=rewire'];
  sassLoader = ExtractTextPlugin.extract('style-loader', [
    'css-loader?modules&localIdentName=[hash:base64:5]',
    'postcss-loader',
    'sass-loader?' + sassParams.join('&'),
  ].join('!'));
  cssLoader = ExtractTextPlugin.extract('style-loader', [
    'css-loader?modules&localIdentName=[hash:base64:5]',
    'postcss-loader',
  ].join('!'));
}

const loaders = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: jsxLoader,
  },
  {
    test: /\.css$/,
    loader: cssLoader,
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/,
    loader: fileLoader,
  },
  {
    test: /\.json$/,
    exclude: /node_modules/,
    loaders: jsonLoader,
  },
  {
    test: /\.html$/,
    loader: htmlLoader,
  },
  {
    test: /\.scss$/,
    loader: sassLoader,
  },
];

module.exports = loaders;
