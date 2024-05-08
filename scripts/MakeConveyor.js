
function createConveyorbelt() {
  let positionX = width / 2;
  let positionY = height / 2;
  let velocityX = 0;
  let lineNumber = 900;

  let leftClock = createClock(-75*8,-190,1, 160) // spacing
  let midClock = createClock(0,-190,1,160)
  let rightClock = createClock(75*8,-190,1,160)

  const display = () => {
    textSize(22);
    fill(200);
    noStroke();
    push();
    translate(positionX, positionY);
    scale(1/gamma2,1)
    rect(-positionX, 0, width * 80, height / 16);
    for (let i = -lineNumber / 2; i < lineNumber / 2; i++) {
      stroke(160);
      strokeWeight(1);
      line(spacing*.8 * i - 40, -height / 32, spacing*.8 * i, height / 32);
      stroke(1);
      line(spacing*.8 * i, height / 32, spacing*.8 * i, height / 32 -10);
      if (i%5 === 0) {
        noStroke();
        fill(100);
        text(`${(i/10 ).toFixed(1)} ly`, (spacing *.8 * i + 25), height / 32 + 24);
      }
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
    leftClock.move(rewind)
    midClock.move(rewind)
    rightClock.move(rewind)
  };

  const setVelocity = (val) => {
    velocityX = val;
  };

  const reset = () => {
    positionX = width / 2;
    velocityX = 0;
    beltVelocitySlider.value(0);
    leftClock.reset();
    midClock.reset(); 
    rightClock.reset();
  };

  return { display, move, setVelocity, reset };
}
