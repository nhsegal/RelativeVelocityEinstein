const makeSliders = () => {
  carVelocitySlider = createSlider(-49, 49);
  carVelocitySlider.id('carslider')
  carVelocitySlider.parent('canvasDiv')
  carVelocitySlider.position(60, -2.43*height/5, 'relative');
  
  carVelocitySlider.size(180);
  carVelocitySlider.value(0);
  describe('A dark gray square with a range slider at the top.');

  beltVelocitySlider = createSlider(-49, 49);
  beltVelocitySlider.id('beltslider')
  beltVelocitySlider.parent('canvasDiv')
  beltVelocitySlider.position(-125, -2.23*height/5, 'relative');

  beltVelocitySlider.size(180);
  beltVelocitySlider.value(0);
  describe('A dark gray square with a range slider at the top.');
}