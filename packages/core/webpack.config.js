const { join } = require('path');


module.exports = {
    mode: 'production',

    entry: {
        index: './src/index.js'
    },

    output: {
        path: join(__dirname, 'dist/cjs'),
        library: '@fragment/core',
        libraryTarget: 'umd'
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

    devtool: 'source-map'
};