function createClock(x, y, rate, shift) {
  let positionX = x;
  let positionY = y;
  let reading = shift;
  
  const reset = () => {
    positionX = x;
    positionY = y;
    reading = shift;
  };
  const setVelocity = (val) => {
    velocityX = val;
  };
 
  const display = () => {
    push()
    translate(positionX,positionY)
    scale(1/gamma2,1)
    fill(255);
    stroke(0)
    rect(0  , 0 , 150, 50, 10)
   fill(0)
    textSize(36)
   textAlign(CENTER)
   text(
    `${(reading/600 ).toFixed(3)} yr`,
    0,
    0
  );
    pop()
  };

  const move = (rewind) => {
    if (!rewind){
      positionX = positionX + simRate*velocityX;
      reading = reading + rate;

    }
    else {
      positionX = positionX - simRate*velocityX;
      reading = reading - rate;
    }
   
  };

  const reportPosition = () => {
    return positionX
  }

  return { display, move, reset, setVelocity,  reportPosition };
}
