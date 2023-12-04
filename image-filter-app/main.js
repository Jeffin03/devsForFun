var image;
var canvas1;
var canvas2;

function upload() {
    canvas1 = document.getElementById("canvas1");
    var imgFile = document.getElementById("fileInput");
    image = new SimpleImage(imgFile);
    image.drawTo(canvas1);
}

function purpleFilter() {
    var purpleImage = image;
    canvas2 = document.getElementById("canvas2");
    for (var pixel of purpleImage.values()) {
        pixel.setGreen(0);
    }
    image.drawTo(canvas2);
}

function greyFilter() {
    var greyImage = image;
    canvas2 = document.getElementById("canvas2");
    for (var pixel of greyImage.values()) {

        var greypx = (pixel.getGreen() + pixel.getBlue() + pixel.getRed()) / 3;
        pixel.setRed(greypx);
        pixel.setGreen(greypx);
        pixel.setBlue(greypx);

    }
    image.drawTo(canvas2);
}
