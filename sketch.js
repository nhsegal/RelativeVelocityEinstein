let car_img;
let car;

// Load the image.
function preload() {
  car_img = loadImage('imgs/car.png');
}


function setup() {
  createCanvas(800, 400);
  background(220);
  imageMode(CENTER);
  car = createCar();
  
}

function draw() {
  car.display()

}

function createCar() {
  let positionX = width/2;
  let positionY = height/2;
  let sizeX = 185;
  let sizeY = 100; 
  const display = () => {
    
    image(car_img, positionX, positionY, sizeX, sizeY);
    describe('A red car');
  }
  const move = () => {
    positionX = positionX + 1;
  }

  return { display }
    
  }

