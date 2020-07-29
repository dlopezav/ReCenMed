const path = require('path')

module.exports = {
    mode: 'development',
    devServer: {
        historyApiFallback: true
    },
    entry: path.resolve(__dirname, "./src/index.js"),
    module: {
        rules:[
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],                        
                    }
                    
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use : [
                    {
                            loader: 'style-loader',
                    },
                    {
                            loader: 'css-loader',
                            options: {
                                    sourceMap: true,
                            }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              },
        ]
    },
    output: {
        path: __dirname+ "/public/js",
        filename: "bundle.js"
    },   
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}


