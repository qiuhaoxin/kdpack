"use strict";

// import webpack from 'webpack';
var webpack = require('webpack');

var rimraf = require('rimraf');

var webpackProdConfig = require('../../webpackConfig/webpack.config.prod');

var path = require('path');

rimraf(path.resolve(process.cwd(), './dist'), function () {
  console.log("del successfully!");
  console.log("webpackProdConfig is ", webpackProdConfig);
  var compiler = webpack(webpackProdConfig);
  compiler.run(function (err, stats) {
    if (err || stats.hasErrors) {
      console.log("build has error ", stats.toJson().errors);
    }
  });
});