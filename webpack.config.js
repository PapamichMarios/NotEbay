const path = require('path');

module.exports = {
    entry: {
        index: './src/main/resources/static/reactjs/components/index.js'
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
         }
      ]
    }
}
