const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");

module.exports = [
    {
        target: "web",
        mode: 'production',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'build/www'),
            clean: true,
            library: "nucleus",
            libraryTarget: "umd",
            globalObject: "this",
            umdNamedDefine: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [{
                        loader: "ts-loader",
                        options: {
                            configFile: "tsconfig.prod.json"
                        }
                    }],
                    exclude: /node_modules/,

                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        plugins: [
            new RemovePlugin({
                before: {
                    include: [
                        './build'
                    ]
                }
            }),
            new CopyPlugin({
                patterns: [
                    { from: 'package.json', to: '../package.json' }
                ]
            })
        ],
        entry: {
            main: path.resolve(__dirname, "src", "main.ts")
        }
    }
];