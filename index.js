'use strict';

function getMime(path) {
  var extension = path.split('.').pop();
  if (['svg', 'jpg', 'jpeg', 'webp', 'gif', 'png'].indexOf(extension) === -1) {
    throw new Error('Unsupported type of image');
  }
  
  if (extension == 'svg') {
    return 'image/svg+xml';
  }
  
  if (extension == 'jpg') {
    return 'image/jpeg';
  }
  
  return 'image/' + extension;
}

module.exports = function base64ImageLoader(content) {
  this.cacheable && this.cacheable();
  return `module.exports = "data:${getMime(this.resourcePath)};base64,${content.toString('base64')}"`;
};
module.exports.raw = true;
