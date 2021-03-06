const path = require('path');

module.exports = {
    entry: {
        index: './src/main/resources/static/reactjs/components/index.js',
        footer: './src/main/resources/static/reactjs/components/info.js'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './src/main/resources/static/reactjs/build')
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', "@babel/preset-react"]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
           'style-loader',
           'css-loader'
          ]
         },
         {
            test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
            loader: 'url-loader'
         }
      ]
    }
}
