


const cwd = process.cwd();
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
function resolve(relativePath) {
    return path.resolve(cwd, relativePath);
}
module.exports = {
    entry: {
        app: resolve('src/main.js'),
    },
    output: {
        filename: 'js/[name].[hash:8].js',
        path: resolve('./dist'),
        chunkFilename: 'js/[name].async.js',
        // publicPath: '/dist',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.vue', '.css', '.less', '.sass'],
        alias: {
            "@": path.resolve(cwd, './src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: resolve('src'),
                use: require.resolve('babel-loader'),
            }, {
                test: /\.vue$/,
                use: require.resolve('vue-loader'),
            }, {
                test: /\.css$/,
                // exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // require.resolve('style-loader'),
                    require.resolve('css-loader'),
                ]

            }, {
                test: /\.less$/,
                // exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // require.resolve('style-loader'),
                    require.resolve('css-loader'),
                    {
                        loader: require.resolve('less-loader'),
                        options: {
                            javascriptEnabled: true
                        }
                    },
                ]
            }, {
                test: /\.(jpe?g|png|gif|webp|svg)$/,
                loader: require.resolve('file-loader'),
                // options: {
                //     limit: 1024 * 10,
                //     name: path.resolve(cwd, '../dist/img/[name].[hash:8].[ext]'),
                // },
            }, {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: require.resolve('url-loader'),
                options: {
                    limit: 1024 * 10,
                    // name: path.resolve(cwd, '../dist/media/[name].[hash:8].[ext]'),
                },
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    // name: resolve('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(process.cwd(), 'src/public/index.html'),
            minify: true,
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
            ignoreOrder: false,
        })
    ]
}