
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
let devWebpackConfig = {
    mode: 'development',
    devtool: 'clean-modules-eval-source-map',
};

module.exports = webpackMerge(devWebpackConfig, baseWebpackConfig);

