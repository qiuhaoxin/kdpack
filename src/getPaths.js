const { resolve } = require('path');
const { realpathSync } = require('fs');


function resolveOwn(relativePath) {
    return resolve(__dirname, relativePath);
}

export default function (cwd) {
    const appDirectory = realpathSync(cwd);

    function resolveApp(relativePath) {
        return resolve(cwd, relativePath);
    }
    return {
        appBuild: resolveApp('dist'),
        appSrc: resolveApp('src'),
        appPublic: resolveApp('public'),
        appNodeModules: resolveApp('node_modules'),
        appOwnNodeModules: resolveOwn('../node_modules'),
        appDirectory,
        resolveApp,
    }
}