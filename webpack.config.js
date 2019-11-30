const path = require('path')

module.exports = {
    entry: './app/index.jsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build',)
    },
    module: {
    rules: [
        {test: /\.jsx?/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        },
        {test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        }
    ]
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        publicPath: '/build',
        port: 4000,
        proxy: {
            '/api' : 'http://localhost:3000'
        }
    }
}