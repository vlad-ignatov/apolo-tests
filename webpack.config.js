const Package           = require("./package.json");
const Path              = require("path");
const Webpack           = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NODE_ENV          = process.env.NODE_ENV || "development";
const IS_PROD           = NODE_ENV === "production";

const out = {
    devtool: IS_PROD ? "hidden-source-map" : "source-map",
    entry: {
        app: Path.resolve("./src/index.tsx"),
        vendor: [
            "react",
            "react-dom",
            "prop-types"
            // "react-redux",
            // "react-router",
            // "redux",
            // "redux-thunk",
            // "redux-actions",
            // "jquery",
            // "moment"
        ]
    },
    output: {
        path             : Path.resolve("./dist/js"),
        filename         : "[name].bundle.js",
        sourceMapFilename: "[name].bundle.map",
        publicPath       : "/js/",
        devtoolModuleFilenameTemplate(info) {
            return "file:///" + info.absoluteResourcePath;
        }
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.tsx?$/,
                exclude: ["node_modules"],
                use: ["awesome-typescript-loader", "source-map-loader"]
            },
            {
                test: /\.less$/,
                loaders: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react"    : "React",
        "react-dom": "ReactDOM",
        "jquery"   : "jQuery",
        "moment"   : "moment"
    },

    plugins: [
        new Webpack.DefinePlugin({
            "process.env": {
                // eslint-disable-line quote-props
                NODE_ENV: JSON.stringify(NODE_ENV)
            },
            __APP_VERSION__ : "'" + Package.version + "'"
        }),
        new HtmlWebpackPlugin({
            title   : Package.name + (NODE_ENV !== "production" ? " (" + NODE_ENV + ")" : ""),
            filename: Path.resolve("./dist/index.html"),
            template: Path.resolve("./src/index.ejs"),
            inject  : false,
            env     : NODE_ENV
        }),
        new Webpack.optimize.CommonsChunkPlugin({
            name     : "vendor",
            minChunks: 2,
            filename : "vendor.bundle.js"
        }),
    //     new webpack.LoaderOptionsPlugin({
    //       options: {
    //         tslint: {
    //           emitErrors: true,
    //           failOnHint: true
    //         }
    //       }
    //     })
    //   ]
    ]
};

// PRODUCTION
// -----------------------------------------------------------------------------
if (NODE_ENV == "production") {
    out.plugins.push(
        new Webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            output: { comments: false },
            sourceMap: true
        })
    );
}

// DEVELOPMENT
// -----------------------------------------------------------------------------
if (NODE_ENV == "development") {
    out.devServer = {
        contentBase: Path.resolve("./dist/"),
        compress   : true,
        port       : 3000,
        // hot        : true,
        // hotOnly    : true,
        overlay    : true,
        quiet      : false,
        // inline     : true,

        // Tell the server to watch the files served by the
        // devServer.contentBase option. File changes will trigger a full
        // page reload.
        watchContentBase: true,

        watchOptions: {
            // poll: true,
            aggregateTimeout: 300,
            ignored: /node_modules/
        },

        stats: {
            // Add asset Information
            assets: true,

            // Sort assets by a field
            assetsSort: "field",

            // Add information about cached (not built) modules
            cached: true,

            // Show cached assets (setting this to `false` only shows emitted files)
            cachedAssets: true,

            // Add children information
            children: false,

            // Add chunk information (setting this to `false` allows for a less verbose output)
            chunks: false,

            // Add built modules information to chunk information
            chunkModules: false,

            // Add the origins of chunks and chunk merging info
            chunkOrigins: true,

            // Sort the chunks by a field
            chunksSort: "field",

            // Context directory for request shortening
            context: "./src/",

            // `webpack --colors` equivalent
            colors: true,

            // Display the distance from the entry point for each module
            depth: true,

            // Display the entry points with the corresponding bundles
            entrypoints: true,

            // Add errors
            errors: true,

            // Add details to errors (like resolving log)
            errorDetails: true,

            // Exclude assets from being displayed in stats
            // This can be done with a String, a RegExp, a Function getting the assets name
            // and returning a boolean or an Array of the above.
            // excludeAssets: "filter" | /filter/ | (assetName) => ... return true|false |
            //      ["filter"] | [/filter/] | [(assetName) => ... return true|false],

            // Exclude modules from being displayed in stats
            // This can be done with a String, a RegExp, a Function getting the modules source
            // and returning a boolean or an Array of the above.
            // excludeModules: "filter" | /filter/ | (moduleSource) => ... return true|false |
            //     ["filter"] | [/filter/] | [(moduleSource) => ... return true|false],

            // See excludeModules
            // exclude: "filter" | /filter/ | (moduleSource) => ... return true|false |
            //     ["filter"] | [/filter/] | [(moduleSource) => ... return true|false],

            // Add the hash of the compilation
            hash: true,

            // Set the maximum number of modules to be shown
            maxModules: 100,

            // Add built modules information
            modules: false,

            // Sort the modules by a field
            modulesSort: "field",

            // Show dependencies and origin of warnings/errors (since webpack 2.5.0)
            moduleTrace: true,

            // Show performance hint when file size exceeds `performance.maxAssetSize`
            performance: true,

            // Show the exports of the modules
            providedExports: false,

            // Add public path information
            publicPath: true,

            // Add information about the reasons why modules are included
            reasons: false,

            // Add the source code of modules
            source: true,

            // Add timing information
            timings: true,

            // Show which exports of a module are used
            usedExports: true,

            // Add webpack version information
            version: true,

            // Add warnings
            warnings: true,

            // Filter warnings to be shown (since webpack 2.4.0),
            // can be a String, Regexp, a function getting the warning and returning a boolean
            // or an Array of a combination of the above. First match wins.
            // warningsFilter: "filter" | /filter/ | ["filter", /filter/] | (warning) => ... return true|false

        }
    };

    out.plugins.push(new Webpack.HotModuleReplacementPlugin());
}

module.exports = out;
