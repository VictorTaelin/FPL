module.exports = {
  // Uint, Uint -> CanvasImage
  CanvasImage: function(width, height){
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");
    var imageData = context.getImageData(0, 0, width, height);
    var buffer = new ArrayBuffer(width*height*4);
    var buffer8 = new Uint8ClampedArray(buffer);
    var buffer32 = new Uint32Array(buffer);
    return {
      canvas: canvas,
      context: context,
      width: width,
      height: height,
      imageData: imageData,
      buffer8: buffer8,
      buffer32: buffer32};
  },

  drawBuffer: function(buffer8, canvasImage){
    canvasImage.imageData.data.set(buffer8);
    canvasIMage.context.putImageData(canvasImage.imageData, 0, 0);
  },

  // (Uint, Uint -> RGBA8), *CanvasImage -> CanvasImage
  draw: function(field, canvasImage){
    var buffer32 = canvasImage.buffer32;
    var width = canvasImage.width;
    var height = canvasImage.height;
    for (var y=0; y<height; ++y)
      for (var x=0; x<width; ++x)
        buffer32[y*width+x] = field(x, y);
    canvasImage.imageData.data.set(canvasImage.buffer8);
    canvasImage.context.putImageData(canvasImage.imageData, 0, 0);
    return canvasImage;
  }
};

