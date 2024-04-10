let car_img;
let wheel_img;
let car;
let resetButton;
let carVelocitySlider;


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
  resetButton = createButton('Reset');
  resetButton.position(0, 100);
  resetButton.mousePressed(car.reset);

   // Create a slider and place it at the top of the canvas.
   carVelocitySlider = createSlider(-20, 20);
   carVelocitySlider.position(10, 10);
   carVelocitySlider.size(80);
   describe('A dark gray square with a range slider at the top.');
 
}

function draw() {
  background(220);
  car.setVelocity( carVelocitySlider.value()/10);
  car.move()
  car.display()

}

function createCar() {
  let positionX = width/2;
  let positionY = height/2;
  let velocityX = -1.0;
  let sizeX = 195;
  let sizeY = 100; 
  let angle = 0;

  const reset = () => {
    positionX = width/2;
    velocityX = 0;
    carVelocitySlider.value(0);
  }

  const setVelocity = (val) => {
    velocityX = val;
  }

  const display = () => {
    push()
    if (velocityX){
      scale(velocityX/abs(velocityX), 1)
      image(car_img, (velocityX/abs(velocityX))*positionX, positionY, sizeX, sizeY);
    } 
    else {
      image(car_img, positionX, positionY, sizeX, sizeY);
    }
    pop()

    push();
    translate(positionX - sizeX*.31, positionY + sizeY*0.16)
    rotate(angle);
    image(wheel_img, 0, 0, .2*sizeX, .2*sizeX);
    pop();
    
    push();
    translate(positionX + sizeX*.314, positionY + sizeY*.16)
    rotate(angle);
    image(wheel_img, 0, 0, .2*sizeX, .2*sizeX);
    pop();


    describe('A red car');
  }

  const move = () => {
    positionX = positionX + velocityX;
    angle = angle + .0003*sizeX*velocityX;
  }

  return { display, move, reset, setVelocity}
    
  }


