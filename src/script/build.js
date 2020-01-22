// import webpack from 'webpack';
const webpack = require('webpack');
const rimraf = require('rimraf');
const webpackProdConfig = require('../../webpackConfig/webpack.config.prod');
const path = require('path');
rimraf(path.resolve(process.cwd(), './dist'), () => {
    console.log("del successfully!");
    console.log("webpackProdConfig is ", webpackProdConfig);
    const compiler = webpack(webpackProdConfig);
    compiler.run((err, stats) => {
        if (err || stats.hasErrors) {
            console.log("build has error ", stats.toJson().errors);
        }
    });
})
