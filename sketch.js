//This web app draws a Mandelbrot Set and shows the Julia Set of the point selected by the mouse cursor inside the Mandelbrot Set dynamically.
//WHAT IS THE MANDELBROT SET?
//Define an iterative function in the complex plane f_c_(z) = z^2 + c, where c is a complex number (input) and where z goes from 0 to inifinity:
// the initial z = 0 so that z(0) = c, and z(1) = c^2 + c, z(2) = (c^2 + c)^2 + c and so on.
//The Mandelbrot Set is the set of points c in the complex plane that under iteration as inputs (c) of f_c_(z) produce an output that does not tend to infinity.
//WHAT IS THE JULIA SET?
//Define an iterative function in the complex plane f_c_(z) = z^2 + c, where c is a given value and where z is a complex number.
//The Julia Set is the set of points z in the complex plane that under iteration as inputs (z) of f_c_(z) produce an output that does not tend to infinity.

//There is a strong correlation between these two sets, because if a point belonging to the Mandelbrot Set is taken as the given value c of the Julia Set,
//it produces peculiar "drawings" in the complex plane.

//GLOBAL VARIABLES
let width = 500;
let height = 500;
let iterations = 100;
let aa;
let bb;
let bright;
let xInput;
let yInput;


//SKETCH ONE - MANDELBROT SET
var mandelbrot = function(m) {
  m.setup = function() {
    m.createCanvas(width, height);
    m.pixelDensity(1);
    m.loadPixels();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let a = m.map(x, 0, width, -2, 2);
        let b = m.map(y, 0, width, -2, 2);
				//ca and cb are the initial input
        let ca = a;
        let cb = b;
        let n = 0;
				//Calculating if the point belongs to the set
        while (n < iterations) {
          aa = a * a - b * b;
          bb = 2 * a * b;
          a = aa + ca;
          b = bb + cb;
          if (a * a + b * b > 4) {
            break;
          }
          n++;
        }
				//Adjust pixels' brightness according to the number of iterations
        bright = m.map(n, 0, iterations, 0, 1);
        bright = m.map(m.sqrt(bright), 0, 1, 0, 255);
        if (n == iterations) {
          bright = 0;
        }
        let pix = (x + y * width) * 4;
        m.pixels[pix + 0] = bright;
        m.pixels[pix + 1] = bright;
        m.pixels[pix + 2] = bright;
        m.pixels[pix + 3] = 255;
      }
    }
    m.updatePixels();
  };//Setup

  m.draw = function() {
		//Takes mouse's cursor and store it in a global variable that is passed to julia set
		xInput = m.map(m.mouseX, 0, width, -2, 2);
		yInput = m.map(m.mouseY, 0, height, -2, 2);
  };
};
var myp5 = new p5(mandelbrot, 'c1');




// SKETCH TWO - JULIA SET
var julia = function(j){
	j.setup = function() {
		//j.colorMode(j.HSB, 255);
		j.createCanvas(width, height);
		j.pixelDensity(1);
	};

  j.draw = function() {
		j.loadPixels();
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				let a = j.map(x, 0, width, -2, 2);
				let b = j.map(y, 0, width, -2, 2);
				let n = 0;
				//Same calculation of mandelbrot, but adds the mouse input instead of the initial point
				while (n < iterations) {
					aa = a * a - b * b;
					bb = 2 * a * b;
					a = aa + xInput;
					b = bb + yInput;
					if (a * a + b * b > 4) {
						break;
					}
					n++;
				}
				//Colouring...
				bright = j.map(n, 0, iterations, 0, 1);
				bright = j.map(j.sqrt(bright), 0, 1, 0, 255);
				if (n == iterations) {
					bright = 0;
				}
				let pix = (x + y * width) * 4;
				j.pixels[pix + 0] = bright
				j.pixels[pix + 1] = bright
				j.pixels[pix + 2] = bright
				j.pixels[pix + 3] = 255;
			}
		}
		j.updatePixels();
	};
};
var myp5 = new p5(julia, 'c2');
