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


let beta1;
let gamma1;
let beta2;
let gamma2;

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

  // Create a slider and place it at the top of the canvas.
  carVelocitySlider = createSlider(-49, 49);
  carVelocitySlider.id('carslider')
  carVelocitySlider.parent('canvasDiv')
  carVelocitySlider.position(120, -2.43*height/5, 'relative');
  
  carVelocitySlider.size(180);
  carVelocitySlider.value(0);
  describe('A dark gray square with a range slider at the top.');

  beltVelocitySlider = createSlider(-49, 49);
  beltVelocitySlider.id('beltslider')
  beltVelocitySlider.parent('canvasDiv')
  beltVelocitySlider.position(-65, -2.23*height/5, 'relative');

  beltVelocitySlider.size(180);
  beltVelocitySlider.value(0);
  describe('A dark gray square with a range slider at the top.');

  textFont('Arial');
  spacing = 75;
  clock = 0;


}

function draw() {
    beta1 = (carVelocitySlider.value()/30.5 + beltVelocitySlider.value()/30.5)/
    (1+ (carVelocitySlider.value()/30.5)*(beltVelocitySlider.value()/30.5))
    gamma1 = 1/Math.sqrt(1-beta1*beta1)
    beta2 = beltVelocitySlider.value()/30.5
    gamma2 = 1/Math.sqrt(1-beta2*beta2)


  if (!paused){
    clock++;
  }
  frameRate(60)
  background(255);
  makeNumberLine()
  fill(0)
  noStroke();
  textSize(20);
  textAlign(RIGHT);
  text('Car Velocity Relative to Belt', 2.16* width / 4,  (3.2 * height) / 5);
  textSize(24);
  fill(200, 20, 20);
  text(
    `${(carVelocitySlider.value()).toFixed(2)/50}c`,
    3.04* width / 5 ,
    (3.2 * height) / 5
  );

  fill(0);
  textSize(20);
  text('Belt Velocity Relative to Ground', 2.16* width / 4 ,  (3.4 * height) / 5);
  textSize(24);
  fill(120, 120, 120);
  text(
    `${(beltVelocitySlider.value()).toFixed(2)/50}c`,
    3.04* width / 5 ,
    (3.4 * height) / 5
  );

  fill(0, 100, 0);
  textSize(24)
  text(
    `${(beltVelocitySlider.value() + carVelocitySlider.value()).toFixed(2)/50}c`,
    3.04* width / 5,
    (3.6 * height) / 5
  );

  fill(0);
  textSize(20);
  text('Car Velocity Relative to Ground', (2.16 * width) / 4  , (3.6 * height) / 5);

  car.setVelocity(
    carVelocitySlider.value() / 16 + beltVelocitySlider.value() / 16
  );
  belt.setVelocity(beltVelocitySlider.value() / 16);
  car.setSpin(carVelocitySlider.value() / 16);
  if (!paused){
    car.move();
    belt.move();
  }

  belt.display();
  car.display();

  makeArrow(
    12 * carVelocitySlider.value(),
    car.reportPosition(),
    height / 12 + 50,
    1,
    0,
    color(200, 0, 0)
  );

  makeArrow(
    12 * beltVelocitySlider.value(),
    car.reportPosition(),
     1.35*height / 12 + 50,
    1,
    0,
    color(120, 120, 120)
  );

  
  makeArrow(
    12 * beltVelocitySlider.value() + 12 * carVelocitySlider.value(),
    car.reportPosition(),
    1.7*height/12 + 50,
    1,
    0,
    color(0, 100, 0)
  );

  fill(255);
  stroke(0)
  rect(4.1 *width/5, height-210, 130, 50, 10)
  fill(0)
  textSize(36)
  textAlign(CENTER)
  text(
    `${(clock / 60).toFixed(2)} s`,
    4.1*width / 5,
    ( height) -200
  );
  
  fill(0)
  noStroke()
  textSize(16)
  textAlign(RIGHT)
  text(
    "Credit: Copied from Michael Freeman (afreeparticle.com) ",
    5*width / 5,
     height - 5 
  );

}


function createConveyorbelt() {
  let positionX = width / 2;
  let positionY = height / 2;
  let velocityX = 0;
  let lineNumber = 900;

  const display = () => {
    textSize(18);
    fill(200);
    noStroke();

    push();
    translate(positionX, positionY);
    scale(1/gamma2,1)
    rect(-positionX, 0, width * 80, height / 16);
    for (let i = -lineNumber / 2; i < lineNumber / 2; i++) {
      noStroke();
      fill(100);
      text(`${i * 10} cm`, (spacing * 2 * i + 8), height / 32 + 15);
      stroke(1);
      strokeWeight(1);
      line(spacing * i - 40, -height / 32, spacing * i, height / 32);
    }
    pop();
  };

  const move = () => {
    positionX = positionX + velocityX;
  };

  const setVelocity = (val) => {
    velocityX = val;
  };

  const reset = () => {
    positionX = width / 2;
    velocityX = 0;
    beltVelocitySlider.value(0);
  };

  return { display, move, setVelocity, reset };
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
    text(`${i * 10} cm`, spacing * 2 * i + 8, height / 32 + 15);
    stroke(0, 100, 0);
    strokeWeight(1);
    line(2*spacing * i , height / 32 + 24, 2*spacing * i, height / 32+ 120);
  }
  pop() 
}
