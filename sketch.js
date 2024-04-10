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
  createCanvas(1400, 600);
  background(255);
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);
  car = createCar();
  belt = createConveyorbelt();
  resetButton = createButton('Reset');
  resetButton.position(width / 2 - 50, (4 * height) / 5);
  resetButton.mousePressed(() => {
    car.reset();
    belt.reset();
  });

  // Create a slider and place it at the top of the canvas.
  text("Car's velocity relative to belt", 10, 10);
  carVelocitySlider = createSlider(-20, 20);
  carVelocitySlider.position(width / 10, (3.9 * height) / 5);
  carVelocitySlider.size(160);
  carVelocitySlider.value(0);
  describe('A dark gray square with a range slider at the top.');

  beltVelocitySlider = createSlider(-20, 20);
  beltVelocitySlider.position(width / 10, (4.65 * height) / 5);
  beltVelocitySlider.size(160);
  beltVelocitySlider.value(0);
  describe('A dark gray square with a range slider at the top.');

  textFont('Arial');
}

function draw() {
  background(255);
  fill(0);
  text('Car Velocity Relative to Belt', width / 6, (4.2 * height) / 5);
  textSize(24);
  fill(200, 20, 20);
  text(
    `${carVelocitySlider.value() / 10} cm/s`,
    width / 6,
    (3.87 * height) / 5
  );

  fill(0);
  textSize(18);
  text('Belt Velocity Relative to Ground', width / 6, (4.95 * height) / 5);
  textSize(24);
  fill(30, 30, 200);
  text(
    `${beltVelocitySlider.value() / 10} cm/s`,
    width / 6,
    (4.62 * height) / 5
  );
  car.setVelocity(
    carVelocitySlider.value() / 10 + beltVelocitySlider.value() / 10
  );
  belt.setVelocity(beltVelocitySlider.value() / 10);
  car.setSpin(carVelocitySlider.value() / 10);
  car.move();
  belt.move();

  belt.display();
  car.display();
  makeArrow(4*carVelocitySlider.value(), width/2, height/5, 1, 0, color(200, 0, 0))
  makeArrow(4*beltVelocitySlider.value(), width/2, 1.2*height/5, 1, 0, color(25, 25, 200))
  makeArrow(4*beltVelocitySlider.value()+4*carVelocitySlider.value(), width/2, 1.4*height/5, 1, 0, color(25, 25, 25))
}

function createCar() {
  let positionX = width / 2;
  let positionY = height / 2;
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
    push();

    image(car_img, positionX, positionY, sizeX, sizeY);

    pop();

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
    angle = angle + 0.00023 * sizeX * spinRate;
  };

  return { display, move, reset, setVelocity, setSpin };
}

function createConveyorbelt() {
  let positionX = width / 2;
  let velocityX = 0;
  let lineNumber = 300;
  let spacing = 80;

  const display = () => {
    textSize(18);
    fill(200);
    noStroke();
    
    push();
    translate(positionX, height / 2);
   
    rect(-positionX, height / 12, width * 2, height / 6);
    for (let i = -lineNumber / 2; i < lineNumber / 2; i++) {
      noStroke();
      fill(0);
      text(`${i * 10} cm`, spacing * 2 * i + 8, height / 6 + 18);
      stroke(1);
      strokeWeight(1);
      line(spacing * i - 40, 0, spacing * i, height / 6);
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

function makeArrow(length, x, y, dirx, diry, c){
  let col = color(c)
  push()
  translate(x, y)
  rotate(atan(diry/dirx))
  strokeWeight(10)
    stroke(col)
    strokeCap(SQUARE);
  line(0,0,length,0)
  strokeWeight(1)
  fill(col)
  if(length){
    triangle(11*abs(length)/length+length, 0, length-10*length/abs(length) , 10, length-11*length/abs(length), -10);
  }
  
  pop()
}