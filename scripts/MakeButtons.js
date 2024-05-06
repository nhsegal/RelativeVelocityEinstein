const makeButtons = () => {
  resetButton = createButton('');
  resetButton.size(160, 80);
  resetButton.id('resetbutton');
  resetButton.parent('canvasDiv');
  resetButton.position(618, -145, 'relative');
  resetButton.mousePressed(() => {
    car.reset();
    belt.reset();
    clock = 0;
    paused = true;
    rewind = false;
    carVelocitySlider.elt.disabled = false;
    beltVelocitySlider.elt.disabled = false;
    forwardButton.style('visibility', 'hidden');
    backwardButton.style('visibility', 'hidden');
    loop();
  });

  playButton = createButton('');
  playButton.size(160, 80);
  playButton.id('playbutton');
  playButton.parent('canvasDiv');
  playButton.position(710, -245, 'relative');

  playButton.mousePressed(() => {
    if (paused) {
      playButton.style('background-color:#f0a0a0');
      paused = false;
      carVelocitySlider.elt.disabled = true;
      beltVelocitySlider.elt.disabled = true;
      forwardButton.style('visibility', 'hidden');
      backwardButton.style('visibility', 'hidden');
    } else {
      playButton.style('background-color:#90d090');
      paused = true;
      carVelocitySlider.elt.disabled = false;
      beltVelocitySlider.elt.disabled = false;
      forwardButton.style('visibility', 'visible');
      backwardButton.style('visibility', 'visible');
    }
  });

  forwardButton = createButton('');
  forwardButton.size(70, 35);
  forwardButton.id('forwardbutton');
  forwardButton.parent('canvasDiv');
  forwardButton.position(640, -205, 'relative');
 
  forwardButton.mousePressed(() => {
    rewind = false;
    noLoop();
    paused = false;
    draw();
    paused = true;
    carVelocitySlider.elt.disabled = true;
    beltVelocitySlider.elt.disabled = true;
    loop();
  });

  backwardButton = createButton('');
  backwardButton.size(70, 35);
  backwardButton.id('backwardbutton');
  backwardButton.parent('canvasDiv');
  backwardButton.position(480, -205, 'relative');
  backwardButton.mousePressed(() => {
    rewind = true;
    noLoop();
    paused = false;
    draw();
    paused = true;
    rewind = false;
    carVelocitySlider.elt.disabled = true;
    beltVelocitySlider.elt.disabled = true;
    loop();
  });
};
