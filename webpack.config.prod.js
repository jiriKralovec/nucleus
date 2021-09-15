const path = require('path');

module.exports = [
    {
        target: "web",
        mode: 'production',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'build'),
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
        entry: {
            main: path.resolve(__dirname, "src", "main.ts")
        }
    }
];