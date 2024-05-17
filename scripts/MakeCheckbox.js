const makeCheckboxes = () => {
  showclockscheckbox = createCheckbox('Conveyor Belt Clocks')
  showclockscheckbox.parent('canvasDiv')
  showclockscheckbox.addClass('checkbox')
  showclockscheckbox.position(40,-660, 'relative')
  showdistancecheckbox = createCheckbox('Conveyor Belt Distance Markers')
  showdistancecheckbox.parent('canvasDiv')
  showdistancecheckbox.addClass('checkbox')
  showdistancecheckbox.position(40,-655, 'relative')
  showvectorscheckbox = createCheckbox('Show Velocity Vectors')
  showvectorscheckbox.parent('canvasDiv')
  showvectorscheckbox.position(1220,-700, 'relative')
  showvectorscheckbox.addClass('checkbox')

  showdistancecheckbox.checked(true)
  showclockscheckbox.checked(true)
  showvectorscheckbox.checked(true)
}
