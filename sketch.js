let car_img;
let wheel_img;
let car;

// Load the image.
function preload() {
  car_img = loadImage('imgs/car.png');
  wheel_img = loadImage('imgs/wheel.png');
}


function setup() {
  createCanvas(800, 400);
  background(220);
  imageMode(CENTER);
  car = createCar();
  
}

function draw() {
  background(220);
  car.move()
  car.display()

}

function createCar() {
  let positionX = width/2;
  let positionY = height/2;
  let velocityX = 0;
  let sizeX = 195;
  let sizeY = 100; 
  let angle = 0;

  const display = () => {
    image(car_img, positionX, positionY, sizeX, sizeY);
    ellipse(positionX+ sizeX*.32, positionY + sizeY*.15, 10, 10)
   // image(wheel_img, positionX, positionY, sizeX, sizeY);
    push();
    translate(positionX - sizeX*.314, positionY + sizeY*.172)
    rotate(angle);
    translate(-positionX + sizeX*.314, -positionY - sizeY*.172)
    image(wheel_img, positionX, positionY, sizeX, sizeY);
    pop();
    
    push();
    translate(positionX + sizeX*.314, positionY + sizeY*.172)
    rotate(angle);
    translate(-positionX + sizeX*.314, -positionY - sizeY*.172)
    image(wheel_img, positionX, positionY, sizeX, sizeY);
    pop();


    describe('A red car');
  }

  const move = () => {
    positionX = positionX + 0;
    angle = angle + .1
  }

  return { display, move, angle}
    
  }

