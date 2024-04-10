let car_img;
let wheel_img;
let car;
let carVelocitySlider;

let belt;
let beltVelocitySlider;

let resetButton;

// Load the image.
function preload() {
  car_img = loadImage('imgs/car.png');
  wheel_img = loadImage('imgs/wheel.png');
}


function setup() {
  createCanvas(1400, 400);
  background(255);
  rectMode(CENTER)
  imageMode(CENTER);
  textAlign(CENTER);
  car = createCar();
  belt = createConveyorbelt();
  resetButton = createButton('Reset');
  resetButton.position(width/2 - 50, 4*height/5);
  resetButton.mousePressed(()=> {
    car.reset()
    belt.reset()
  });

   // Create a slider and place it at the top of the canvas.
   carVelocitySlider = createSlider(-20, 20);
   carVelocitySlider.position(width/10, 4*height/5);
   carVelocitySlider.size(160);
   carVelocitySlider.value(0);
   describe('A dark gray square with a range slider at the top.');

   beltVelocitySlider = createSlider(-20, 20);
   beltVelocitySlider.position(width/10, 4.5*height/5);
   beltVelocitySlider.size(160);
   beltVelocitySlider.value(0);
   describe('A dark gray square with a range slider at the top.');
   
   textFont('Arial')
}

function draw() {
  background(255);
  car.setVelocity( carVelocitySlider.value()/10 + beltVelocitySlider.value()/10);
  belt.setVelocity( beltVelocitySlider.value()/10);
  car.setSpin(carVelocitySlider.value()/10 )
  car.move();
  belt.move();
 
  belt.display();
  car.display()

}

function createCar() {
  let positionX = width/2;
  let positionY = height/2;
  let velocityX = 0;
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

  const setSpin = (val) => {
    spinRate = val
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
     angle = angle + .0003*sizeX*(spinRate);
  }

  return { display, move, reset, setVelocity, setSpin}
    
  }

function createConveyorbelt() {
  let positionX = width/2;
  let velocityX = 0;
  let lineNumber = 100;
  let spacing = 80;

  const display = () => {
    textSize(18);
    fill(200)
    noStroke()
    push()
    translate(positionX, height/2)
    rect(0, height/12, width*2, height/6)

    for (let i = -lineNumber/2; i < lineNumber/2; i++){
        noStroke()
        fill(0);
        text(`${i*10} cm`, spacing*2*i+8, height/6 + 18);
        stroke(1)
        strokeWeight(1)
        line(spacing*i-40, 0, spacing*i, height/6)
    }
    pop()
  }

  const move = () => {
    positionX = positionX + velocityX;
  }

  const setVelocity = (val) => {
    velocityX = val;
  }

  const reset = () => {
    positionX = width/2;
    velocityX = 0;
    beltVelocitySlider.value(0);
  }

  return {display, move, setVelocity, reset}


}
