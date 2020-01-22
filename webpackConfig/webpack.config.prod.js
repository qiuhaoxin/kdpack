

const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base');


const webpackProdConfig = {
    mode: 'production',
    output: {
        publicPath: './'
    }
};
module.exports = webpackMerge(webpackProdConfig, webpackBaseConfig);