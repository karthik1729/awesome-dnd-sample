module.exports = {
    entry:"./src/index.js",
    resolve: {
        extensions: [".js",".jsx"]
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets:["@babel/preset-react"]
                    }
                }
            }
        ]
    },
    devServer: {
        host:"0.0.0.0",
        contentBase:"public"
    }
}
