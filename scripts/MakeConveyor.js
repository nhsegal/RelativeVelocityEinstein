
function createConveyorbelt() {
  let positionX = width / 2;
  let positionY = height / 2;
  let velocityX = 0;
  let lineNumber = 900;

  let leftClock = createClock(-75*8,-200,1,0) // spacing
  let midClock = createClock(0,-200,1,0)
  let rightClock = createClock(75*8,-200,1,0)

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
      text(`${(i * .25).toFixed(2)} ly`, (spacing * 2 * i + 8), height / 32 + 15);
      stroke(1);
      strokeWeight(1);
      line(spacing * i - 40, -height / 32, spacing * i, height / 32);
    }
    leftClock.display()
    midClock.display()
    rightClock.display()
    pop();
  };

  const move = (rewind) => {
    if (!rewind){
      positionX = positionX + simRate*velocityX;
    }
    else {
      positionX = positionX - simRate*velocityX;
    }

  };

  const setVelocity = (val) => {
    velocityX = val;
    leftClock.setShift(val);
    rightClock.setShift(-val);
  };

  const reset = () => {
    positionX = width / 2;
    velocityX = 0;
    beltVelocitySlider.value(0);
  };

  return { display, move, setVelocity, reset };
}
