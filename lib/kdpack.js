"use strict";

var path = require('path');

var join = path.join,
    resolve = path.resolve,
    relative = path.relative;

var _require = require('fs'),
    existsSync = _require.existsSync;

var chalk = require('chalk');

var updateNotifier = require('update-notifier');

var camelCase = require('camelcase');

var childProcess = require('child_process');

var nodeVersion = process.versions.node;
var nodeVersions = nodeVersion.split('.');
var major = nodeVersions[0];
var minor = nodeVersions[1];

if (major * 10 + minor * 1 < 70) {
  console.log(chalk.red.bold("node\u7248\u672C\u5FC5\u987B\u5927\u4E8E7.0\uFF0C\u5F53\u524D\u7248\u672C\u662F".concat(major, ".").concat(minor))); // process.exit(1);
}

var pkg = require('../package.json'); // console.log('pkg is ', JSON.stringify(pkg));


updateNotifier({
  pkg: pkg
}).notify({
  defer: true
});
var script = process.argv[2];
script = camelCase(script);
var args = process.argv.slice(3); // console.log('script is ', script);

switch (script) {
  case 'v':
  case 'version':
    var packageName = pkg.name;
    var version = pkg.version;
    console.log(chalk.yellow.bold("".concat(packageName, " version is ").concat(version)));
    break;

  default:
    getScript(script);
    break;
} //exports.getScript =


function getScript(command) {
  // console.log('command is ', command)
  if (!existsSync(join(__dirname, "./script/".concat(command, ".js")))) {
    console.log("this command ".concat(command, " is not validate!"));
    process.exit(1);
  }

  var proc = childProcess.fork(join(__dirname, "./script/".concat(command, ".js")), args, {
    stdio: 'inherit'
  });
  proc.on('exit', function () {});
  proc.on('close', function () {});
}