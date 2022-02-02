const path = require("path");
module.exports = {
    entry: path.resolve(__dirname, "src") + "/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "index.js",
        chunkFilename: "[id].js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    devServer: {
        static: "./dist/",
        historyApiFallback: true,
        compress: true,
        open: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-react",
                            {"useBuiltins": "entry",
                                "targets": {
                                    "browsers": [
                                        "> 0.2%",
                                        "not dead",
                                        "not ie <= 11",
                                        "not op_mini all"
                                    ]
                                }
                            }], "@babel/preset-env"],
                        plugins: [
                            "react-hot-loader/babel"
                        ]
                    }
                }
            },
            {
                test: /\.(css)$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(gif|png|svg|jpe|jpg|jpeg)$/,
                type: "asset/resource"
            }
        ]
    }
};




