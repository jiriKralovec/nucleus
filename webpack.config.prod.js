const path = require('path');
const glob = require('glob');
const CopyPlugin = require("copy-webpack-plugin");

const getGlobEntries = (root) => {
    const o = {};
    glob
        .sync(`./${root}/**/*.{ts,tsx,js}`)
        .map((p) => [ p, p.replace(`./${root}/`, '') ])
        .forEach((tuple) => {
            o[tuple[1].replace(/((\.){1}[(js)(ts)(tsx)]+)/, '')] = tuple[0];
        });
    return o;
}

module.exports = [
    {
        target: "web",
        mode: 'production',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'build'),
            clean: true,
            library: "tokyo",
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