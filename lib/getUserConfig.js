"use strict";

var _require = require('path'),
    join = _require.join,
    resolve = _require.resolve;

var assert = require('assert');

var _require2 = require('fs'),
    existsSync = _require2.existsSync,
    readFileSync = _require2.readFileSync;

var stripJsonComments = require('strip-json-comments'); //export default


module.exports = function getUserConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$cwd = options.cwd,
      cwd = _options$cwd === void 0 ? process.cwd() : _options$cwd,
      _options$configFile = options.configFile,
      configFile = _options$configFile === void 0 ? 'kdpackrc' : _options$configFile;
  var rcFilePath = resolve(cwd, configFile);
  var jsRCFilePath = resolve(cwd, "".concat(configFile, ".js"));
  assert(!(existsSync(rcFilePath) && existsSync(jsRCFilePath)), "file ".concat(rcFilePath, " and file ").concat(jsRCFilePath, " can not exit at the same time"));
  var config = {};

  if (existsSync(rcFilePath)) {
    config = stripJsonComments(readFileSync(rcFilePath, 'utf-8'));
    config = config.replace(/\/r\/n/, '');
    config = JSON.parse(config); // config = JSON.parse(config);
    //config = JSON.parse(stripJsonComments(readFileSync(rcFilePath)));
  }

  if (existsSync(jsRCFilePath)) {
    // delete require.cache[jsRCFilePath];
    config = require(jsRCFilePath);
    console.log("the config from js file is ", config);

    if (config["default"]) {
      config = config["default"];
    }
  }

  return config;
};