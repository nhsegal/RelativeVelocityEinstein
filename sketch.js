let car_img;

// Load the image.
function preload() {
  car_img = loadImage('imgs/car.png');
}


function setup() {
  createCanvas(800, 400);
  background(220);
  imageMode(CENTER)
  image(car_img, 200, 200, 185, 100);
  describe('A red car');
  
}

function draw() {

}