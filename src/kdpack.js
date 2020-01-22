
const path = require('path');
const { join, resolve, relative } = path;
const { existsSync } = require('fs');
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const camelCase = require('camelcase');
const childProcess = require('child_process');
const nodeVersion = process.versions.node;
const nodeVersions = nodeVersion.split('.');
const major = nodeVersions[0];
const minor = nodeVersions[1];

if (major * 10 + minor * 1 < 70) {
    console.log(chalk.red.bold(`node版本必须大于7.0，当前版本是${major}.${minor}`));
    // process.exit(1);
}
const pkg = require('../package.json');
// console.log('pkg is ', JSON.stringify(pkg));
updateNotifier({ pkg }).notify({ defer: true });
let script = process.argv[2];
script = camelCase(script);
const args = process.argv.slice(3);
// console.log('script is ', script);

switch (script) {
    case 'v':
    case 'version':
        const packageName = pkg.name;
        const version = pkg.version;
        console.log(chalk.yellow.bold(`${packageName} version is ${version}`));
        break;
    default:
        getScript(script);
        break;
}
//exports.getScript =
function getScript(command) {
    // console.log('command is ', command)
    if (!existsSync(join(__dirname, `./script/${command}.js`))) {
        console.log(`this command ${command} is not validate!`);
        process.exit(1);
    }
    const proc = childProcess.fork(join(__dirname, `./script/${command}.js`),
        args, {
        stdio: 'inherit',
    })
    proc.on('exit', function () {

    });
    proc.on('close', function () {

    })

}








