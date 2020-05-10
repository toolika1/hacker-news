const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: './server/index.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
    {
      test: /\.less$/,
      use: [
        {
          loader: "style-loader"
        },
       
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            modules: true,
            localIdentName: "[local]___[hash:base64:5]"
          }
        },
        {
          loader: "less-loader"
        }
      ]
    },
    {
      test: /\.css$/,
      use: 'css-loader'
    }
    ]
  }
};
