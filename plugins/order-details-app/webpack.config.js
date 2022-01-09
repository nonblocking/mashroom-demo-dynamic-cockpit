
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: __dirname + '/src/index',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    target: ['web', 'es5'],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            }
        ],
    },
    externals: [],
    plugins: [
        new ESLintPlugin({
            fix: true,
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    devServer: {
        host: 'localhost',
        port: 6543,
        open: true,
        static: {
            directory: path.join(__dirname, 'src'),
        },
    },
};
