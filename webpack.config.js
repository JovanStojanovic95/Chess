const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        chessJS: './src/js/controllers/game.js',
        indexJS: './src/js/index.js'
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "Main",
            template: "./src/template/index.html",
            chunks: ['indexJS']

        }), new HtmlWebpackPlugin({
            filename: "chess.html",
            title: "Chess",
            template: "./src/template/chess.html",
            chunks: ['chessJS']

        })
    ],
    devServer: {
        contentBase: "./dist"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }]
    }
};