//Programming Assignment 1
function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = 0;
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    // use the sliders to get various parameters
    var dx = slider1.value;
    var dy = slider2.value;
    
    // draw one filled polygon
    function DrawPoly1(color) {
      context.beginPath();
      context.fillStyle = color;
      context.moveTo(25,25);
      context.lineTo(150,25);
      context.lineTo(150,300);
      context.lineTo(100,75);
      context.lineTo(13,300);
      context.closePath();
      context.fill();      
    }

    // draw one filled polygon
    function DrawPoly2(color) {
      context.beginPath();
      context.fillStyle = color;
      context.moveTo(100,75);
      context.moveTo(13,300);
      context.lineTo(100,75);
      context.lineTo(150, 300);
      context.closePath();
      context.fill();
    }

    // draw circle
    function DrawCircle() {
      context.beginPath();
      context.fillStyle = "white";
      context.arc(55, 45, 16, 0, 2 * Math.PI);
      context.fill();
    }

    // draw rectangle adjacent to the two polygons
    function DrawShape() {
      context.beginPath();
      context.moveTo(155,25);
      context.lineTo(155, 150);
      context.lineTo(305,150);
      context.lineTo(305, 25);
      context.closePath();
      context.stroke();
    }

    // draw shapes that are not affected by the sliders
    DrawShape();
    DrawPoly1("yellow");
    DrawCircle();

    context.save();
    context.translate(dx,dy);

    // second polygon of different color is translatable with sliders
    DrawPoly2("blue");
    context.restore();
    
  }
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  draw();
}
window.onload = setup;
