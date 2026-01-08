const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        "app": "./lib/index.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'kkiapay.bundle.js',
        library: 'kkiapay',
        libraryTarget: 'umd',
        globalObject: 'this'
    }
}