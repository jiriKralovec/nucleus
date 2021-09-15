const path = require('path');
const glob = require('glob');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
    {
        mode: 'development',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                lib: path.resolve(process.cwd(), 'src/')
            }
        },
        entry: {
            main: glob.sync(`./example/**/*.{ts,tsx,js}`)
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    { from: 'example/*.html', to: '[name].html' }
                ]
            })
        ],
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist/example'),
        }
    },
    {
        mode: 'development',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist/library'),
        },
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                lib: path.resolve(process.cwd(), 'src/')
            }
        },
        entry: {
            main: glob.sync(`./src/**/*.{ts,tsx,js}`)
        }
    }
];