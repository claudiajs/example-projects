'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');

const base = require('./webpack.config.base');

const config = Object.assign({}, base)

config.entry = [
  // Include an alternative client for WebpackDevServer. A client's job is to
  // connect to WebpackDevServer by a socket and get notified about changes.
  // When you save a file, the client will either apply hot updates (in case
  // of CSS changes), or refresh the page (in case of JS changes). When you
  // make a syntax error, this client will display a syntax error overlay.
  // Note: instead of the default WebpackDevServer client, we use a custom one
  // to bring better experience for Create React App users. You can replace
  // the line below with these two lines if you prefer the stock client:
  // require.resolve('webpack-dev-server/client') + '?/',
  // require.resolve('webpack/hot/dev-server'),
  require.resolve('react-dev-utils/webpackHotDevClient'),
  // We ship a few polyfills by default:
  require.resolve('./polyfills'),
  // Errors should be considered fatal in development
  require.resolve('react-error-overlay'),
  // Finally, this is your app's code:
  paths.appIndexJs,
  // We include the app code last so that if there is a runtime error during
  // initialization, it doesn't blow up the WebpackDevServer client, and
  // changing JS code would still trigger a refresh.
]

config.output = {
  // Next line is not used in dev but WebpackDevServer crashes without it:
  path: paths.appBuild,
  // Add /* filename */ comments to generated require()s in the output.
  pathinfo: true,
  // This does not produce a real file. It's just the virtual path that is
  // served by WebpackDevServer in development. This is the JS bundle
  // containing code from all our entry points, and the Webpack runtime.
  filename: 'static/js/bundle.js',
  // There are also additional JS chunk files if you use code splitting.
  chunkFilename: 'static/js/[name].chunk.js',
  // This is the URL that app is served from. We use "/" in development.
  publicPath: '/',
  hotUpdateChunkFilename: 'static/[id].[hash].hot-update.js',
  hotUpdateMainFilename: 'static/[hash].hot-update.json',
  // Point sourcemap entries to original disk location
  devtoolModuleFilenameTemplate: info =>
    path.resolve(info.absoluteResourcePath),
}

config.module.rules = config.module.rules.concat([
  // "postcss" loader applies autoprefixer to our CSS.
  // "css" loader resolves paths in CSS and adds assets as dependencies.
  // "style" loader turns CSS into JS modules that inject <style> tags.
  // In production, we use a plugin to extract that CSS to a file, but
  // in development "style" loader enables hot editing of CSS.
  {
    test: /\.css$/,
    use: [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
    ],
  },
])

config.plugins = config.plugins.concat([
  // This is necessary to emit hot updates (currently CSS only):
  new webpack.HotModuleReplacementPlugin(),
  // Watcher doesn't work well if you mistype casing in a path so we use
  // a plugin that prints an error when you attempt to do this.
  // See https://github.com/facebookincubator/create-react-app/issues/240
  new CaseSensitivePathsPlugin(),
  // If you require a missing module and then `npm install` it, you still have
  // to restart the development server for Webpack to discover it. This plugin
  // makes the discovery automatic so you don't have to restart.
  // See https://github.com/facebookincubator/create-react-app/issues/186
  new WatchMissingNodeModulesPlugin(paths.appNodeModules),
])

// Turn off performance hints during development because we don't do any
// splitting or minification in interest of speed. These warnings become
// cumbersome.
config.performance = {
  hints: false,
}

// Some libraries import Node modules but don't use them in the browser.
// Tell Webpack to provide empty mocks for them so importing them works.
config.node = {
  fs: 'empty',
  net: 'empty',
  tls: 'empty',
},

module.exports = config
