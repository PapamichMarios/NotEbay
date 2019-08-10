const path = require('path');

module.exports = {
  entry: {
	index:  './src/main/resources/static/reactjs/components/index.js'
  },
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './src/main/resources/static/reactjs/build')
  },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            },
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
        		test: /\.(png|jpg|gif)$/i,
        		use: [{
            		loader: 'url-loader',
            		options: {
              			limit: 8192,
            		}
          		}]
      		}
        ]
    }
};

