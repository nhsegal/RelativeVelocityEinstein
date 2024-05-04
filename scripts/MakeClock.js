function createClock(x, y, rate, shift, color) {
  let positionX = x;
  let positionY = y;
  let reading = shift;
  let clockRate = rate;


  const reset = () => {
    positionX = x;
    positionY = y;
    reading = shift;
    console.log(reading)
  };
  const setVelocity = (val) => {
    velocityX = val;
  };
  const setShift = (val) => {
    reading = val;
  };
  const setRate = (val) => {
    myRate = val;
  };

  const display = () => {
    push();
    translate(positionX, positionY);
    //scale(1 / gamma2, 1);
    fill(255);
    stroke(color);
    rect(0, 0, 120, 40, 10);
    fill(color);
    textSize(26);
    textAlign(CENTER);
    text(`${(reading / 600).toFixed(3)} yr`, 0, 10);
    line(0,20,0,220)
    pop();
  };

  const move = (rewind) => {
    if (!rewind) {
    // positionX = positionX + simRate * velocityX;
      reading = reading + simRate * clockRate / gamma2;
    } else {
   //   positionX = positionX - simRate * velocityX;
      reading = reading - simRate * clockRate / gamma2;
    }
  };

  const reportPosition = () => {
    return positionX;
  };

  return { display, move, reset, setVelocity, reportPosition, setShift, setRate };
}
