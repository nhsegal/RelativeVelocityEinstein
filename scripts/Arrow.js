function makeArrow(length, x, y, dirx, diry, c) {
  noStroke();
  let col = color(c);
  push();
  translate(x, y);
  rotate(atan(diry / dirx));
  fill(col);
  beginShape();
  vertex(0, -4);
  vertex(0, 4);
  vertex(length * 0.7, 4);
  vertex(length * 0.65, 8);
  vertex(length, 0);
  vertex(length * 0.65, -8);
  vertex(length * 0.7, -4);
  endShape(CLOSE);
  pop();
}
