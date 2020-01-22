"use strict";

// import getPort from '../getPort.js';
var getPort = require('../getPort.js');

var getUserConfig = require('../getUserConfig.js');

var webpack = require('webpack');

var WebpackDevServer = require('webpack-dev-server');

var HOST = process.env.HOST || '0.0.0.0';

var webpackDevConfig = require('../../webpackConfig/webpack.config.dev');

var path = require('path');

var userConfig = getUserConfig();

var chalk = require('chalk');

console.log("userConfig is ", userConfig);

try {
  var getBabelConfig = require('../babel');

  var babelConfig = getBabelConfig(userConfig.extractBabelPresets || {}, userConfig.extractBabelPlugins);
  console.log("babelConfig is ", babelConfig);

  var registerBabel = require('../registerBabel');

  registerBabel({
    babelPresets: babelConfig && babelConfig.presets,
    babelPlugins: babelConfig && babelConfig.plugins
  });
} catch (e) {
  console.log('exception is ', e);
}

getPort().then(function (port) {
  var webpackCompiler = webpack(webpackDevConfig);
  var serverConfig = {
    // disableHostCheck: true,
    compress: true,
    // clientLogLevel: 'none',
    hot: true,
    quiet: true,
    stats: 'errors-only',
    headers: {
      'access-control-allow-origin': '*'
    },
    // publicPath: path.resolve(process.cwd(), "dist"),
    // watchOptions: {
    //     ignored: /node_modules/,
    // },
    watchContentBase: true,
    // historyApiFallback: false,
    // overlay: false,
    // contentBase: path.resolve(process.cwd(), "dist"),
    proxy: webpackDevConfig && webpackDevConfig.proxy,
    before: function before(app) {},
    after: function after(app) {}
  };
  var webpackServer = new WebpackDevServer(webpackCompiler, serverConfig);
  ['SIGINT', 'SIGTERM'].forEach(function (signal) {
    process.on(signal, function () {
      webpackServer.close(function () {
        process.exit(0);
      });
    });
  });
  webpackServer.listen(port, HOST, function (err) {
    if (err) {
      console.log("error is ", err);
      return;
    }

    console.log(chalk.green("starting develop server at port ".concat(port)));
  });
})["catch"](function (err) {
  console.log("the error in dev is ", err);
});