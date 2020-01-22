// import getPort from '../getPort.js';
const getPort = require('../getPort.js');
const getUserConfig = require('../getUserConfig.js');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HOST = process.env.HOST || '0.0.0.0';
const webpackDevConfig = require('../../webpackConfig/webpack.config.dev');
const path = require('path');
const userConfig = getUserConfig();
const chalk = require('chalk');
console.log("userConfig is ", userConfig);
try {
    const getBabelConfig = require('../babel');

    const babelConfig = getBabelConfig(userConfig.extractBabelPresets || {}, userConfig.extractBabelPlugins);
    console.log("babelConfig is ", babelConfig)
    const registerBabel = require('../registerBabel');
    registerBabel({
        babelPresets: babelConfig && babelConfig.presets,
        babelPlugins: babelConfig && babelConfig.plugins,
    })
} catch (e) {
    console.log('exception is ', e)
}

getPort().then(port => {
    const webpackCompiler = webpack(webpackDevConfig);
    const serverConfig = {
        // disableHostCheck: true,
        compress: true,
        // clientLogLevel: 'none',
        hot: true,
        quiet: true,
        stats: 'errors-only',
        headers: {
            'access-control-allow-origin': '*',
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
        before(app) {

        },
        after(app) {

        },
    }
    const webpackServer = new WebpackDevServer(webpackCompiler, serverConfig);
    ['SIGINT', 'SIGTERM'].forEach(signal => {
        process.on(signal, () => {
            webpackServer.close(() => {
                process.exit(0);
            })
        })
    })
    webpackServer.listen(port, HOST, (err) => {
        if (err) {
            console.log("error is ", err);
            return;
        }
        console.log(chalk.green(`starting develop server at port ${port}`));
    })
}).catch((err) => {
    console.log("the error in dev is ", err);
})




