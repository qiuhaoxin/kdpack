
const { join, resolve } = require('path');
const assert = require('assert');
const { existsSync, readFileSync } = require('fs')
const stripJsonComments = require('strip-json-comments');
//export default
module.exports = function getUserConfig(options = {}) {
    const {
        cwd = process.cwd(),
        configFile = 'kdpackrc',
    } = options;
    const rcFilePath = resolve(cwd, configFile);
    const jsRCFilePath = resolve(cwd, `${configFile}.js`);
    assert(
        !(existsSync(rcFilePath) && existsSync(jsRCFilePath)),
        `file ${rcFilePath} and file ${jsRCFilePath} can not exit at the same time`
    );
    let config = {};
    if (existsSync(rcFilePath)) {
        config = stripJsonComments(readFileSync(rcFilePath, 'utf-8'));
        config = config.replace(/\/r\/n/, '');
        config = JSON.parse(config);
        // config = JSON.parse(config);
        //config = JSON.parse(stripJsonComments(readFileSync(rcFilePath)));
    }
    if (existsSync(jsRCFilePath)) {
        // delete require.cache[jsRCFilePath];
        config = require(jsRCFilePath);
        console.log("the config from js file is ", config);
        if (config.default) {
            config = config.default;
        }
    }
    return config;
}