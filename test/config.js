const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const fromHere = dir => path.resolve(__dirname, dir);
const outputPath = fromHere('result1');

module.exports = {
  output: {
    path: outputPath,
    filename: 'index.js'
  },

  plugins: [
    new CleanWebpackPlugin([outputPath], {
      verbose: true
    })
  ],

  module: {
    rules: [
      {
        test: /\.(png|css|woff)$/,
        loader: path.join(__dirname, '../index.js'),
        query: {
          name: '[name].[ext]'
        }
      }
    ]
  }
};
