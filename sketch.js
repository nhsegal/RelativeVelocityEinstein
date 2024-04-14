let car_img;
let wheel_img;
let car;
let carVelocitySlider;

let belt;
let beltVelocitySlider;

let resetButton;
let playButton;
let paused = true;
let spacing;
let clock;

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
  resetButton = createButton('Reset');
  resetButton.size(80,25);
  resetButton.id('resetbutton')
  resetButton.parent('canvasDiv')
  resetButton.position(780, -255, 'relative');
  resetButton.mousePressed(() => {
    car.reset();
    belt.reset();
    clock = 0;
    paused = true;
  });

  playButton = createButton('Play');
  playButton.size(80,25);
  playButton.id('playbutton')
  playButton.parent('canvasDiv')
  playButton.position(440, -255, 'relative');
  playButton.mousePressed(() => {

    if (paused){
      playButton.elt.innerHTML = 'Pause'
      paused = false;
    }
     else {
      playButton.elt.innerHTML = 'Play'
      paused = true;
    }
  });

  // Create a slider and place it at the top of the canvas.
  carVelocitySlider = createSlider(-30, 30);
  carVelocitySlider.id('carslider')
  carVelocitySlider.parent('canvasDiv')
  carVelocitySlider.position(90, -155, 'relative');
  
  carVelocitySlider.size(180);
  carVelocitySlider.value(0);
  describe('A dark gray square with a range slider at the top.');

  beltVelocitySlider = createSlider(-30, 30);
  beltVelocitySlider.id('beltslider')
  beltVelocitySlider.parent('canvasDiv')
  beltVelocitySlider.position(620, -155, 'relative');

  beltVelocitySlider.size(180);
  beltVelocitySlider.value(0);
  describe('A dark gray square with a range slider at the top.');

  textFont('Arial');
  spacing = 75;
  clock = 0;
}

function draw() {
  if (!paused){
    clock++;
  }
  frameRate(60)
  background(255);
  makeNumberLine()
  fill(0)
  noStroke();
  textSize(18)
  text('Car Velocity Relative to Belt', width / 4,  (3.42 * height) / 5);
  textSize(24);
  fill(200, 20, 20);
  text(
    `${(carVelocitySlider.value()).toFixed(2)} cm/s`,
    width / 4 + 20,
    (3.7 * height) / 5
  );

  fill(0);
  textSize(18);
  text('Belt Velocity Relative to Ground', (3 * width) / 4 ,  (3.42 * height) / 5);
  textSize(24);
  fill(120, 120, 120);
  text(
    `${(beltVelocitySlider.value()).toFixed(2)} cm/s`,
    3*width / 4 + 30,
    (3.7 * height) / 5
  );

  fill(0, 100, 0);
  text(
    `${((beltVelocitySlider.value() + carVelocitySlider.value()) / 4).toFixed(2)} cm/s`,
    width / 2,
    (3.7 * height) / 5
  );

  fill(0);
  textSize(18);
  text('Car Velocity Relative to Ground', (2 * width) / 4 , (3.42 * height) / 5);

  car.setVelocity(
    carVelocitySlider.value() / 4 + beltVelocitySlider.value() / 4
  );
  belt.setVelocity(beltVelocitySlider.value() / 4);
  car.setSpin(carVelocitySlider.value() / 4);
  if (!paused){
    car.move();
    belt.move();
  }

  belt.display();
  car.display();
  makeArrow(
    4 * carVelocitySlider.value(),
    width / 2,
    height / 5,
    1,
    0,
    color(200, 0, 0)
  );

  makeArrow(
    4 * beltVelocitySlider.value(),
    width / 2,
    (.8 * height) / 5,
    1,
    0,
    color(120, 120, 120)
  );

  
  makeArrow(
    4 * beltVelocitySlider.value() + 4 * carVelocitySlider.value(),
    width / 2,
    (0.4 * height) / 5,
    1,
    0,
    color(0, 100, 0)
  );

  fill(0)
  textSize(24)
  text(
    `${(clock / 60).toFixed(2)} s`,
    width / 2,
    ( height) / 8
  );


}

function createCar() {
  let positionX = width / 2;
  let positionY = height / 2 - 20;
  let velocityX = 0;
  let sizeX = 195;
  let sizeY = 100;
  let angle = 0;

  const reset = () => {
    positionX = width / 2;
    velocityX = 0;
    carVelocitySlider.value(0);
  };
  const setVelocity = (val) => {
    velocityX = val;
  };
  const setSpin = (val) => {
    spinRate = val;
  };
  const display = () => {
    image(car_img, positionX, positionY, sizeX, sizeY);
    stroke(0)
    for (let i = 0; i<17; i++){
      line(positionX, 160+i*10, positionX, 160+i*10+5)
    }
    push();
    translate(positionX - sizeX * 0.31, positionY + sizeY * 0.16);
    rotate(angle);
    image(wheel_img, 0, 0, 0.2 * sizeX, 0.2 * sizeX);
    pop();

    push();
    translate(positionX + sizeX * 0.314, positionY + sizeY * 0.16);
    rotate(angle);
    image(wheel_img, 0, 0, 0.2 * sizeX, 0.2 * sizeX);
    pop();

    describe('A red car');
  };

  const move = () => {
    positionX = positionX + velocityX;
    angle = angle + 0.0001 * sizeX * spinRate;
  };

  return { display, move, reset, setVelocity, setSpin };
}

function createConveyorbelt() {
  let positionX = width / 2;
  let positionY = height / 2;
  let velocityX = 0;
  let lineNumber = 300;

  const display = () => {
    textSize(18);
    fill(200);
    noStroke();

    push();
    translate(positionX, positionY);

    rect(-positionX, 0, width * 2, height / 16);
    for (let i = -lineNumber / 2; i < lineNumber / 2; i++) {
      noStroke();
      fill(0);
      text(`${i * 10} cm`, spacing * 2 * i + 8, height / 32 + 15);
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

function makeArrow(length, x, y, dirx, diry, c) {
  noStroke();
  let col = color(c);
  push();
  translate(x, y);
  rotate(atan(diry / dirx));
  fill(col);
  beginShape();
  vertex(0, -4);
  vertex(0, 4);
  vertex(length * 0.7, 4);
  vertex(length * 0.65, 8);
  vertex(length, 0);
  vertex(length * 0.65, -8);
  vertex(length * 0.7, -4);
  endShape(CLOSE);
  pop();
}

function makeNumberLine() {
  //let spacing = 80;
  let lineNumber = 20;
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
