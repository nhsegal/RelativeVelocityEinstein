/*
To do:
-clocks on the converyor belt
-if shift is set, clock can't run
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
let showclockscheckbox;
let showdistancecheckbox;
let showvectorscheckbox;



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

  makeButtons();
  makeSliders();
  makeCheckboxes();
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
  
  car.setVelocity(beta1);
  belt.setVelocity(beta2);
  car.setSpin(carVelocitySlider.value()/50);
  if (!paused){
    car.move(rewind);
    belt.move(rewind);

  }

  belt.display();
  makeNumberLine();
  car.display();

if (showvectorscheckbox.checked()){
  makeArrow(
    200 * carVelocitySlider.value()/50,
    car.reportPosition(),
    height / 12 + 144,
    1,
    0,
    color(200, 0, 0)
  );
  makeArrow(
    200 * beltVelocitySlider.value()/50,
    car.reportPosition(),
     1.35*height / 12 + 144,
    1,
    0,
    color(120, 120, 120)
  );  
  makeArrow(
    200 * beta1,
    car.reportPosition(),
    1.7*height/12 + 144,
    1,
    0,
    color(0, 100, 0)
  );
}


  fill(255);
  stroke(0)
  rect(width/2, 40, 150, 50, 10)
  fill(0)
  textSize(36)
  textAlign(CENTER)
  text(
    `${(clock/600 ).toFixed(3)} yr`,
    width / 2,
    50
  );
  


}



function makeNumberLine() {

  let lineNumber = 200;
  textSize(22)
  push()
  translate(width/2, height/4)
  for (let i = -lineNumber / 2; i < lineNumber / 2; i++) {
    stroke(0, 100, 0);
    strokeWeight(1);
    line(.8*spacing * i , height / 32 +50, .8*spacing * i, height / 32+ 100);
    if (i%5 === 0){
      line(.8*spacing * i , height / 32 + 24, .8*spacing * i, height / 32+ 150);
      noStroke();
    fill(0,100, 0);
    text(`${(i * 1/10).toFixed(1)} ly`, .8* spacing  * i + 25, height / 32 + 10);
    }
   
  }
  pop() 
}
