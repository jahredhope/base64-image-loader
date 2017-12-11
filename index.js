'use strict';

const loaderUtils = require('loader-utils');
const mimeType = require('mime-types');
const fileLoader = require('file-loader');

module.exports = function base64ImageLoader(content) {
  this.cacheable && this.cacheable();
  const options = loaderUtils.getOptions(this) || {};
  const context = options.context || this.options.context;

  const extension = loaderUtils.interpolateName(this, '[ext]', {
    context,
    content,
    regExp: context.regExp
  });

  const mime = mimeType.lookup(extension);

  if (!mime) {
    throw new Error('Unsupported extension ' + extension);
  }

  const data = content.toString('base64');

  const limit =
    options.limit ||
    (this.options && this.options.url && this.options.url.dataUrlLimit) ||
    0;

  if (limit <= 0 || content.length < limit) {
    const url = JSON.stringify(`data:${mime};charset=utf-8;base64,${data}`);

    return `module.exports = ${url}`;
  }
  return fileLoader.call(this, content);
};
module.exports.raw = true;
