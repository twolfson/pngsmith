var pngsmith = require('../'),
    expect = require('chai').expect,
    extend = require('obj-extend'),
    commonTest = require('spritesmith-engine-test');

// Override images with png variants
commonTest.config.multipleImages = commonTest.config.multiplePngImages;
commonTest.config.repeatingImage = commonTest.config.repeatingPngImage;

module.exports = extend({}, commonTest.content, {
  'pngsmith': function () {
    this.smith = pngsmith;
  }
});
