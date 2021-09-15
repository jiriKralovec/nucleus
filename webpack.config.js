const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
    /** Example */
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
                {
                    test: /\.html$/i,
                    loader: "html-loader",
                    options: {
                        sources: false
                    }
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                lib: path.resolve(process.cwd(), 'src/')
            }
        },
        entry: {
            main: glob.sync(`./example/**/*.{ts,tsx,js,html}`)
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Output management'
            })
        ],
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist/example'),
            clean: true
        },
        devServer: {
            liveReload: true,
            static: {
                directory: path.join(__dirname, 'dist/example'),
                watch: true
            },
            watchFiles: [ "dist/**/*" ],
            client: {
                overlay: {
                    errors: true,
                    warnings: false
                },
                progress: true
            },
            compress: false,
            port: 9000
        }
    },
    /** Library */
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