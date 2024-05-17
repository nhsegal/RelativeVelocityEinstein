function createClock(x, y, rate, color) {
  let positionX = x;
  let positionY = y;
  let reading = positionX*beta2/gamma2;
  let clockRate = rate;
 
  const reset = () => {
    positionX = x;
    positionY = y;
    beta1 = 0;
    beta2 = 0;
    reading = positionX*beta2/gamma2;

  };


  const display = () => {
    push();
    translate(positionX, positionY);
    fill(255);
    stroke(color);
    rect(0, 0, 120, 40, 10);
    fill(color);
    textSize(26);
    textAlign(CENTER);
    //text(`${((reading - positionX*beta2/Math.sqrt(1-beta2*beta2))/ 600).toFixed(3)} yr`, 0, 10);
    text(`${((reading- positionX*beta2)/ 600).toFixed(3)} yr`, 0, 10);
    // 1/Math.sqrt(1-beta2*beta2)

    line(0,20,0,220)
    pop();
  };

  const move = (rewind) => {
    if (!rewind) {
      reading = reading + simRate * clockRate / gamma2// + x*beta2;
    } else {
      reading = reading - simRate * clockRate / gamma2 //+ x*beta2;
    }
  };

  const reportPosition = () => {
    return positionX;
  };

  return { display, move, reset,  reportPosition };
}
