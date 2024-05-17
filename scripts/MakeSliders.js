const makeSliders = () => {
  carVelocitySlider = createSlider(-49, 49);
  carVelocitySlider.id('carslider')
  carVelocitySlider.parent('canvasDiv')
  carVelocitySlider.position(-176, -2.43*height/5, 'relative');
  carVelocitySlider.size(180);
  carVelocitySlider.value(30);

  describe('A dark gray square with a range slider at the top.');

  beltVelocitySlider = createSlider(-49, 49);
  beltVelocitySlider.id('beltslider')
  beltVelocitySlider.parent('canvasDiv')
  beltVelocitySlider.position(-360, -2.23*height/5, 'relative');

  beltVelocitySlider.size(180);
  beltVelocitySlider.value(-30);
  describe('A dark gray square with a range slider at the top.');
}