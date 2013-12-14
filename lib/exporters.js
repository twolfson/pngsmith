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

    // Add the image to the data itself (easier via offsets)
    var data = this.data;
    var images = this.images;
    images.forEach(function getUrlPath (imageObj) {
      // Iterate over the image's data across its rows
      // setting the original data at that offset
      // [1, 2, 0, 0,
      //  3, 4, 0, 0,
      //  0, 0, 5, 0,
      //  0, 0, 0, 6]
      // Set [1, 2] at 0 + 0 * canvasRow.length (x offset + ((y + imageRow index) * canvasRow length))
      // Set [3, 4] at 0 + 1 * canvasRow.length (x offset + ((y + imageRow index) * canvasRow length))
      var img = imageObj.img;
      var canvasRowWidth = options.width;
      var imageRowWidth = img.width;
      var imgData = img.data;
      var imageRowIndex = 0;
      var imageRowCount = imageObj.height;
      for (; imageRowIndex < imageRowCount; imageRowIndex += 1) {
        // TODO: Use ndarray operations
        data.set(imgData.slice(imageRowIndex * imageRowWidth,
          imageObj.x + ((imageObj.y + imageRowIndex) * canvasRowWidth)));
      }
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