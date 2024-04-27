/*
To do:
-clocks on the converyor belt
-checkbox for vectors

*/

let car_img;
let wheel_img;
let car;
let carVelocitySlider;

let belt;
let beltVelocitySlider;

let resetButton;
let playButton;
let forwardButton;
let backwardButton;
let paused = true;
let spacing;
let clock;

//let testClock;


let beta1= 0;
let gamma1 =1;
let beta2 = 0;
let gamma2= 1;
let carVel = 0;
let rewind = false;
let simRate = 2;

// Load the image.
function preload() {
  car_img = loadImage('imgs/car.png');
  wheel_img = loadImage('imgs/wheel.png');
}

function setup() {
  const myCanvas = createCanvas(1400, 600);
  myCanvas.parent('canvasDiv');
  myCanvas.id('canvas')
  background(255);
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);
  car = createCar();
  belt = createConveyorbelt();
  testClock = createClock(100,100,1, 0)
  makeButtons();
  makeSliders();
  textFont('Arial');
  spacing = 75;
  clock = 0;
}

function draw() {
    beta1 = (carVelocitySlider.value()/50 + beltVelocitySlider.value()/50)/
    (1+ (carVelocitySlider.value()/50)*(beltVelocitySlider.value()/50))
    gamma1 = 1/Math.sqrt(1-beta1*beta1)
    beta2 = beltVelocitySlider.value()/50
    gamma2 = 1/Math.sqrt(1-beta2*beta2)

    
  if (!paused){
    if(rewind){
      clock= clock-simRate;
    } else {
      clock= clock+simRate;
    }
  }
  
  frameRate(60)
  background(255);

  fill(0)
  noStroke();
  textSize(20);
  textAlign(RIGHT);
  text('Car Velocity Relative to Belt', 2.16* width / 4,  (3.2 * height) / 5);
  textSize(24);
  fill(200, 20, 20);
  text(
    `${(carVelocitySlider.value()).toFixed(4)/50}c`,
    3.04* width / 5 ,
    (3.2 * height) / 5
  );

  fill(0);
  textSize(20);
  text('Belt Velocity Relative to Ground', 2.16* width / 4 ,  (3.4 * height) / 5);
  textSize(24);
  fill(120, 120, 120);
  text(
    `${(beltVelocitySlider.value()).toFixed(4)/50}c`,
    3.04* width / 5 ,
    (3.4 * height) / 5
  );

  fill(0, 100, 0);
  textSize(24)
  text(
    `${beta1.toFixed(4)}c`,
    3.04* width / 5,
    (3.6 * height) / 5
  );

  fill(0);
  textSize(20);
  text('Car Velocity Relative to Ground', (2.16 * width) / 4  , (3.6 * height) / 5);
  
  car.setVelocity(
   beta1
  );
  belt.setVelocity(beta2);
  car.setSpin(carVelocitySlider.value()/50);
  if (!paused){
    car.move(rewind);
    belt.move(rewind);
    //testClock.move(rewind)
  }

  belt.display();
  makeNumberLine();
  car.display();
 // testClock.display();

  makeArrow(
    200 * carVelocitySlider.value()/50,
    car.reportPosition(),
    height / 12 + 50,
    1,
    0,
    color(200, 0, 0)
  );
  makeArrow(
    200 * beltVelocitySlider.value()/50,
    car.reportPosition(),
     1.35*height / 12 + 50,
    1,
    0,
    color(120, 120, 120)
  );  
  makeArrow(
    200 * beta1,
    car.reportPosition(),
    1.7*height/12 + 50,
    1,
    0,
    color(0, 100, 0)
  );

  fill(255);
  stroke(0)
  rect(4.1 *width/5, height-210, 150, 50, 10)
  fill(0)
  textSize(36)
  textAlign(CENTER)
  text(
    `${(clock/600 ).toFixed(3)} yr`,
    4.1*width / 5,
    ( height) -200
  );
  


}



function makeNumberLine() {
  //let spacing = 80;
  let lineNumber = 20;
  textSize(18)
  push()
  translate(width/2, height/4)
  for (let i = -lineNumber / 2; i < lineNumber / 2; i++) {
    noStroke();
    fill(0,100, 0);
    text(`${(i * 0.25).toFixed(2)} ly`, spacing * 2 * i + 8, height / 32 + 15);
    stroke(0, 100, 0);
    strokeWeight(1);
    line(2*spacing * i , height / 32 + 24, 2*spacing * i, height / 32+ 150);
  }
  pop() 
}
