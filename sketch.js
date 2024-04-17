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

let modeButton;
let einstein = false;
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
  resetButton = createButton('');
  resetButton.size(80,80);
  resetButton.id('resetbutton')
  resetButton.parent('canvasDiv')
  resetButton.position(975, -245, 'relative');
  resetButton.style("background: url('imgs/reset.png'); background-size:cover; border-radius: 8px")
  resetButton.elt.style
  resetButton.mousePressed(() => {
    car.reset();
    belt.reset();
    clock = 0;
    paused = true;
  });

  playButton = createButton('');
  playButton.size(80,80);
  playButton.id('playbutton')
  playButton.parent('canvasDiv')
  playButton.position(790, -245, 'relative');
  playButton.style("background: url('imgs/playpause.png'); background-size:cover; background-color:#90d090; border-radius: 8px" )
  playButton.mousePressed(() => {

    if (paused){
      //playButton.elt.innerHTML = 'Pause'
      playButton.style("background-color:#f0a0a0")
      paused = false;
    }
     else {
      //playButton.elt.innerHTML = 'Play'
      playButton.style("background-color:#90d090")
      paused = true;
    }
  });

  // Create a slider and place it at the top of the canvas.
  carVelocitySlider = createSlider(-30, 30);
  carVelocitySlider.id('carslider')
  carVelocitySlider.parent('canvasDiv')
  carVelocitySlider.position(120, -2.43*height/5, 'relative');
  
  carVelocitySlider.size(180);
  carVelocitySlider.value(0);
  describe('A dark gray square with a range slider at the top.');

  beltVelocitySlider = createSlider(-30, 30);
  beltVelocitySlider.id('beltslider')
  beltVelocitySlider.parent('canvasDiv')
  beltVelocitySlider.position(-65, -2.23*height/5, 'relative');

  beltVelocitySlider.size(180);
  beltVelocitySlider.value(0);
  describe('A dark gray square with a range slider at the top.');

  textFont('Arial');
  spacing = 75;
  clock = 0;

  
  modeButton = createButton('300,000,000 m/s');
  modeButton.size(180,40);
  modeButton.id('modebutton')
  modeButton.parent('canvasDiv')
  modeButton.position(90, -145, 'relative');
  modeButton.style(" background-size:cover; background-color:#f0a0a0; border-radius: 8px; font-size: 20px" )
  modeButton.mousePressed(() => {
    if (einstein){
      modeButton.elt.innerHTML = '300,000,000 m/s'
      modeButton.style("background-color:#f0a0a0")
      einstein = false;
    }
     else {
      modeButton.elt.innerHTML = '30.5 cm/s'
      modeButton.style("background-color:#3adaff")
      einstein = true;
    }
  });

}

function draw() {
  if (einstein){
    beta1 = (carVelocitySlider.value()/30.5 + beltVelocitySlider.value()/30.5)/
    (1+ (carVelocitySlider.value()/30.5)*(beltVelocitySlider.value()/30.5))
    gamma1 = 1/Math.sqrt(1-beta1*beta1)
    beta2 = beltVelocitySlider.value()/30.5
    gamma2 = 1/Math.sqrt(1-beta2*beta2)
  }
  else {
    gamma1 = 1;
    gamma2 =1;
  }
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
    `${(carVelocitySlider.value()).toFixed(0)} cm/s`,
    3.04* width / 5 ,
    (3.2 * height) / 5
  );

  fill(0);
  textSize(20);
  text('Belt Velocity Relative to Ground', 2.16* width / 4 ,  (3.4 * height) / 5);
  textSize(24);
  fill(120, 120, 120);
  text(
    `${(beltVelocitySlider.value()).toFixed(0)} cm/s`,
    3.04* width / 5 ,
    (3.4 * height) / 5
  );

  fill(0, 100, 0);
  textSize(24)
  text(
    `${(beltVelocitySlider.value() + carVelocitySlider.value()).toFixed(0)} cm/s`,
    3.04* width / 5,
    (3.6 * height) / 5
  );

  fill(0);
  textSize(20);
  text('Car Velocity Relative to Ground', (2.16 * width) / 4  , (3.6 * height) / 5);

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
    playButton.style("background-color:#90d090")
  };
  const setVelocity = (val) => {
    velocityX = val;
  };
  const setSpin = (val) => {
    spinRate = val;
  };
  const display = () => {
    push()
    translate(positionX,positionY)
    scale(1/gamma1,1)
    image(car_img, 0, 0, sizeX, sizeY);
    
    stroke(0)
    for (let i = 0; i<17; i++){
      line(0, -100+i*10, 0, -100+i*10+5)
    }
    push();
    translate(0 - sizeX * 0.31, 0 + sizeY * 0.16);
    rotate(angle);
    image(wheel_img, 0, 0, 0.2 * sizeX, 0.2 * sizeX);
    pop();

    push();
    translate(0 + sizeX * 0.314, 0 + sizeY * 0.16);
    rotate(angle);
    image(wheel_img, 0, 0, 0.2 * sizeX, 0.2 * sizeX);
    pop();
    describe('A red car');
    pop()
  };

  const move = () => {
    positionX = positionX + velocityX;
    angle = angle + 0.0001 * sizeX * spinRate;
   
  };

  const reportPosition = () => {
    console.log(positionX)
    return positionX
  }

  return { display, move, reset, setVelocity, setSpin, reportPosition };
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
