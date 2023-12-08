var greenScreenImage;
var bgScreenImage;
var canvas1;
var canvas2;

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