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
    for (let i = 0; i<13; i++){
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

  const move = (rewind) => {
    if (!rewind){
      positionX = positionX + simRate*velocityX;
      angle = angle + 0.0001 * sizeX * spinRate*simRate;
    }
    else {
      positionX = positionX - simRate*velocityX;
      angle = angle - 0.0001 * sizeX * spinRate*simRate;
    }
   
  };

  const reportPosition = () => {
    return positionX
  }

  return { display, move, reset, setVelocity, setSpin, reportPosition };
}
