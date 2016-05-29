'use strict';

function getFileExtension(path) {
  return path.split('.').pop();
}

module.exports = function base64ImageLoader(content) {
  this.cacheable && this.cacheable();
  return `module.exports = "data:image/${getFileExtension(this.resourcePath)};base64,${content.toString('base64')}"`;
};
module.exports.raw = true;
