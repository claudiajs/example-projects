'use strict';

const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const paths = require('./paths');
const nodeExternals = require('webpack-node-externals');
const getClientEnvironment = require('./env');
const base = require('./webpack.config.base');
const publicUrl = '';
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

const config = Object.assign({}, base)

config.target = 'node'
config.entry = './src/server'
config.externals = [nodeExternals()] // / in order to ignore all modules in node_modules folder
config.output = {
  path: paths.serverBuild,
  filename: 'bundle.js',
  publicPath: '/',
  libraryTarget: 'umd' // Needed so that we can export app for the aws-serverless-express config in index.js
}

config.plugins = config.plugins.concat([
  // Makes some environment variables available to the JS code, for example:
  // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
  new webpack.DefinePlugin(env.stringified),
])

config.node = {
  console: false,
  global: false,
  process: false,
  Buffer: false,
  __filename: false,
  __dirname: false,
  setImmediate: false,
}

module.exports = config
