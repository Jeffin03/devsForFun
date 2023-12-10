var greenScreenImage;
var bgScreenImage;
var canvas1;
var canvas2;
var canvasFinal;

function upload1() {
    canvas1 = document.getElementById("greenInputCanvas");
    var greenScreenInput = document.getElementById("greenImageInput");
    greenScreenImage = new SimpleImage(greenScreenInput);
    greenScreenImage.drawTo(canvas1);
}

function upload2() {
    canvas2 = document.getElementById("bgInputCanvas");
    var bgScreenInput = document.getElementById("bgImageInput");
    bgScreenImage = new SimpleImage(bgScreenInput);
    bgScreenImage.drawTo(canvas2);
}

function mergeImage() {
    canvasFinal = document.getElementById("mergedImage");
    var image1 = greenScreenImage;
    var image2 = bgScreenImage;
    var finalImage = new SimpleImage(image1.width, image1.height);


    for (pixel of image1.values()) {
        if (pixel.getGreen() > (pixel.getRed() + pixel.getBlue())) {
            var x = pixel.getX();
            var y = pixel.getY();
            var newPixel = image2.getPixel(x, y);
            finalImage.setPixel(x, y, newPixel);
        }
        else {
            finalImage.setPixel(pixel.getX(), pixel.getY(), pixel);
        }
    }
    canvasFinal.width = finalImage.width;
    canvasFinal.height = finalImage.height;
    finalImage.drawTo(canvasFinal);

}

// function clear(){
//     location.reload;
// }