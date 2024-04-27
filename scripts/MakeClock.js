function createClock(x, y, rate, shift) {
  let positionX = x;
  let positionY = y;
  let reading = shift;
  let myRate = rate;

  const reset = () => {
    positionX = x;
    positionY = y;
    reading = shift;
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
    stroke(0);
    rect(0, 0, 120, 40, 10);
    fill(0);
    textSize(26);
    textAlign(CENTER);
    text(`${(reading / 600).toFixed(3)} yr`, 0, 10);
    line(0,20,0,220)
    pop();
  };

  const move = (rewind) => {
    if (!rewind) {
      positionX = positionX + simRate * velocityX;
      reading = reading + simRate*myRate;
    } else {
      positionX = positionX - simRate * velocityX;
      reading = reading - simRate * myRate;
    }
  };

  const reportPosition = () => {
    return positionX;
  };

  return { display, move, reset, setVelocity, reportPosition, setShift, setRate };
}
