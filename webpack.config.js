const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';
const buildPath = path.join(__dirname, '/build');

module.exports = {
    entry: ['@babel/polyfill', './src/App.js'],

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/bundle.js',
    },

    mode: NODE_ENV,

    watch: true,

    devtool: isDev && 'source-map',

    node: {
        fs: 'empty',
    },

    devServer: {
        contentBase: buildPath,
        compress: true,
        historyApiFallback: true,
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader',
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: [/node_modules/, `${__dirname}/src/tools/LocalStorage.js`],
                use: {
                    loader: 'eslint-loader',
                    options: {
                        reporter: require('eslint-friendly-formatter'),
                        emitWarning: true,
                        configFile: './.eslintrc',
                    },
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                isDev ? require('cssnano') : () => {},
                                require('autoprefixer')({
                                    browsers: ['last 2 versions'],
                                }),
                            ],
                        },
                    }, 'less-loader'],
            },
            {
                test: /images[\\\/].+\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'url-loader',
                }, {
                    loader: 'image-webpack-loader',
                    options: isDev ? {
                        mozjpeg: {
                            progressive: true,
                            quality: 70,
                        },
                    } : {},
                }],
            },
            {
                test: /fonts[\\\/].+\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ],
    },

    plugins: [
        new Dotenv({
            path: './.env.local',
            safe: true,
        }),

        ...glob.sync('./src/*.html')
            .map(htmlFile => (
                new HtmlWebpackPlugin({
                    filename: path.basename(htmlFile),
                    template: htmlFile,
                })
            )),

        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/static/'),
                to: path.resolve(__dirname, 'build'),
            },
        ]),

        new webpack.DefinePlugin({
            '__DEV__': isDev,
        }),
    ],

    optimization: isDev ? {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        inline: false,
                        drop_console: true,
                    },
                },
            }),
        ],
    } : {},
};
