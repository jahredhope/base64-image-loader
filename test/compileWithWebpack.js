const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const defaultConfig = require('./config');

const deepAssign = require('deep-assign');

const tmpSourceFileLocation = path.resolve(__dirname, 'tmpSourceFile');
const tmpOutputPath = path.resolve(__dirname, 'tmpOutputPath');
const tmpOutputFileName = 'tmpOutputFileName';

module.exports = (source, config = {}) =>
  new Promise((resolve, reject) => {
    const webpackConfig = deepAssign(defaultConfig, config, {
      entry: tmpSourceFileLocation,

      output: {
        path: tmpOutputPath,
        filename: tmpOutputFileName
      }
    });

    console.log('webpackConfig', webpackConfig.module.rules);

    fs.writeFileSync(tmpSourceFileLocation, source);
    webpack(webpackConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        // Handle errors here
        console.error('Error in webpack', err, stats);
        reject(new Error('Unable to compile with webpack'));
        return;
      }
      const content = fs.readFileSync(
        path.join(webpackConfig.output.path, webpackConfig.output.filename),
        'utf8'
      );
      resolve(content);
    });
  });
