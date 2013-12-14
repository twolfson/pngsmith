var path = require('path');
var ndarray = require('ndarray');
var savePixels = require('save-pixels');
var exporters = {};

// Function to add new exporters
function addExporter(name, exporter) {
  exporters[name] = exporter;
}

// Helper to create exporters (could be a class for better abstraction)
function getPngExporter(ext) {
  /**
   * Generic exporter
   * @param {Object} options Options to export with
   * @param {Number} [options.quality] Quality of the exported item
   * @param {Function} cb Error-first callback to return binary image string to
   */
  return function pngExporterFn (options, cb) {
    var that = this;

    // Add the image to the ndarray
    var ndarray = this.ndarray;
    var images = this.images;
    images.forEach(function getUrlPath (imageObj) {
      var img = imageObj.img;
      console.log(imageObj.x, imageObj.y);
    });

    // // Collect our parameters
    // var params = that.params;
    // params.images = images;
    // params.options = options;

      // // Convert the pixels into an ndarray
      // // Taken from https://github.com/mikolalysenko/get-pixels/blob/2ac98645119244d6e52afcef5fe52cc9300fb27b/dom-pixels.js#L14
      // var pngNdarray = ndarray(decodedPixels, [params.height, params.width, 4],
      //                    [4 * params.width, 4, 1], 0),
      //     png = savePixels(pngNdarray, 'PNG');

      // // Pump the stream from png to a binary string (expected by spritesmith)
      // // TODO: We should be calling back with the stream =(
      // var retVal = '';
      // png.on('data', function (buffer) {
      //   retVal += buffer.toString('binary');
      // });
      // png.on('end', function () {
      //   cb(null, retVal);
      // });
  };
}

// Generate the png exporter
var pngExporter = getPngExporter('png');
addExporter('png', pngExporter);
addExporter('image/png', pngExporter);

// Export our exporters
module.exports = {
  exporters: exporters,
  addExporter: addExporter
};