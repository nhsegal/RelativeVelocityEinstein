 const makeButtons = () =>{ 
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


  forwardButton = createButton('');
  forwardButton.size(35,35);
  forwardButton.id('forwardbutton')
  forwardButton.parent('canvasDiv')
  forwardButton.position(755, -205, 'relative');
  forwardButton.style("background: url('imgs/forward.png'); background-size:cover; border-radius: 8px")
  forwardButton.elt.style
  forwardButton.mousePressed(() => {
    paused = true;
  });

  backwardButton = createButton('');
  backwardButton.size(35,35);
  backwardButton.id('backwardButton')
  backwardButton.parent('canvasDiv')
  backwardButton.position(675, -205, 'relative');
  backwardButton.style("background: url('imgs/backward.png'); background-size:cover; border-radius: 8px")
  backwardButton.elt.style
  backwardButton.mousePressed(() => {
    paused = true;
  });
}