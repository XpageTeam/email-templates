const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
    new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
            output: {
                comments: false,
            },
            compress: {
                drop_console: true,
                ecma: 6,
                passes: 2
            }
        },
    }),
]