const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',

    entry: {
        main: './src/index.js',
    },

    output: {
        path: join(__dirname, 'build/public'),
        publicPath: '/'
    },


    resolve: {
        extensions: ['.js'],

        alias: {
        }
    },

    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /(node_modules)/,
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin()
    ],

    devtool: 'inline-source-map',

    devServer: {
        contentBase: join(__dirname, 'build/public'),
        compress: true,
        port: 9000
    }
};