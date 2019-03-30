module.exports = function getElementHeight (el) {
  var elStyle = window.getComputedStyle(el);
  var elDisplay = elStyle.display;
  var elPosition = elStyle.position;
  var elVisibility = elStyle.visibility;
  var elMaxHeight = elStyle.maxHeight;
  var elMaxHeightNumber = elMaxHeight.replace('px', '').replace('%', '');
  var computedHeight = 0;

  if(elDisplay !== 'none' && elMaxHeightNumber !== '0') {
    return el.offsetHeight;
  }

  el.style.maxHeight = '';
  el.style.position = 'absolute';
  el.style.visibility = 'hidden';
  el.style.display = 'block';

  computedHeight = el.offsetHeight;

  el.style.maxHeight = elMaxHeight;
  el.style.display = elDisplay;
  el.style.position = elPosition;
  el.style.visibility = elVisibility;

  return computedHeight;
};
