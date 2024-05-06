const makeCheckboxes = () => {
  showclockscheckbox = createCheckbox('Conveyor Belt Clocks')
  showclockscheckbox.parent('canvasDiv')
  showclockscheckbox.position(40,-660, 'relative')
  showdistancecheckbox = createCheckbox('Conveyor Belt Distance Markers')
  showdistancecheckbox.parent('canvasDiv')
  showdistancecheckbox.position(40,-655, 'relative')
  showvectorscheckbox = createCheckbox('Velocity Vectors')
  showvectorscheckbox.parent('canvasDiv')
  showvectorscheckbox.position(1240,-690, 'relative')
}
