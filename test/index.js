/* eslint-env node, mocha */

const { assert } = require('chai');

const testImageBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='; // eslint-disable-line max-len

const compileWithWebpack = require('./compileWithWebpack');

const sourceWithImport = `
  import base64StringOfImage from './1x1.png';
  console.log(base64StringOfImage);
  `;

describe('testImageBase64', () => {
  it('should include a base64string', async () => {
    const result = await compileWithWebpack(sourceWithImport);

    assert.include(result, testImageBase64);
  });
  it('should not include a base64string when over limit', async () => {
    const config = {
      module: {
        rules: [
          {
            query: {
              limit: 1
            }
          }
        ]
      }
    };
    const result = await compileWithWebpack(sourceWithImport, config);

    assert.notInclude(result, testImageBase64);
  });
  // xit('output the base64 string', () => {
  //   const thisObj = { resourcePath: 'filename.png' };
  //   const aBase64String = 'SGVsbG8gV29ybGQ=';
  //   const result = base64ImageLoader.call(
  //     thisObj,
  //     Buffer.from(aBase64String, 'base64')
  //   );
  //
  //   assert.include(result, aBase64String);
  // });
  //
  // xit('should set extension for jpg', () => {
  //   const thisObj = { resourcePath: 'filename.jpg' };
  //   const result = base64ImageLoader.call(thisObj, Buffer.from(''));
  //
  //   assert.include(result, 'image/jpeg');
  // });
  //
  // xit('should set extension for png', () => {
  //   const thisObj = { resourcePath: 'filename.png' };
  //   const result = base64ImageLoader.call(thisObj, Buffer.from(''));
  //
  //   assert.include(result, 'image/png');
  // });
  //
  // xit('should set extension for svg', () => {
  //   const thisObj = { resourcePath: 'filename.svg' };
  //   const result = base64ImageLoader.call(thisObj, Buffer.from(''));
  //
  //   assert.include(result, 'image/svg+xml');
  // });
  //
  // xit('should throw an error on unknown file extension', () => {
  //   const thisObj = { resourcePath: 'filename.bad' };
  //
  //   assert.throws(base64ImageLoader.bind(thisObj, Buffer.from('')));
  // });
  //
  // xit('output the base64 of the test image', () => {
  //   const thisObj = { resourcePath: 'filename.png' };
  //
  //   const result = base64ImageLoader.call(thisObj, testImage);
  //
  //   assert.include(result, testImageBase64);
  // });
  //
  // xit('case insensitive extension matching', () => {
  //   const testImage = fs.readFileSync('./test/1x1.png');
  //   const testImageBase64 =
  //     'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY/j//z8ABf4C/qc1gYQAAAAASUVORK5CYII='; // eslint-disable-line max-len
  //
  //   const thisObj = { resourcePath: 'filename.pNG' };
  //
  //   const result = base64ImageLoader.call(thisObj, testImage);
  //
  //   assert.include(result, testImageBase64);
  // });
});
