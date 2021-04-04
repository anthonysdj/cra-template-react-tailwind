// const {
//     when,
//     whenDev,
//     whenProd,
//     whenTest,
//     ESLINT_MODES,
//     POSTCSS_MODES,
// } = require("@craco/craco");

// const { loaderByName, addBeforeLoader } = require("@craco/craco");

const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    webpack: {
        configure: function (webpackConfig) {
            const oneOf = webpackConfig.module.rules[1].oneOf;
            oneOf[oneOf.length - 1].exclude.push(/\.php$/);

            return webpackConfig;
        },
    },
    style: {
        postcss: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
        },
    },
    plugins: [
        {
            plugin: {
                overrideWebpackConfig: ({
                    webpackConfig,
                    cracoConfig,
                    pluginOptions,
                    context: { env, paths },
                }) => {
                    // const fileLoader = loaderByName("file-loader");
                    paths.appHtml =
                        env === "development"
                            ? resolveApp("src/index.html")
                            : resolveApp("src/index.php");

                    webpackConfig.plugins[0].options.inject =
                        env === "development" ? true : false;

                    webpackConfig.plugins[0].options.template =
                        env === "development"
                            ? "./src/index.html"
                            : "./src/index.php";

                    webpackConfig.plugins[0].options.filename =
                        env === "development" ? "index.html" : "index.php";

                    return webpackConfig;
                },
            },
            options: {},
        },
    ],
};
