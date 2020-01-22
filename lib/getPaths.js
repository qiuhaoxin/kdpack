"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _require = require('path'),
    resolve = _require.resolve;

var _require2 = require('fs'),
    realpathSync = _require2.realpathSync;

function resolveOwn(relativePath) {
  return resolve(__dirname, relativePath);
}

function _default(cwd) {
  var appDirectory = realpathSync(cwd);

  function resolveApp(relativePath) {
    return resolve(cwd, relativePath);
  }

  return {
    appBuild: resolveApp('dist'),
    appSrc: resolveApp('src'),
    appPublic: resolveApp('public'),
    appNodeModules: resolveApp('node_modules'),
    appOwnNodeModules: resolveOwn('../node_modules'),
    appDirectory: appDirectory,
    resolveApp: resolveApp
  };
}