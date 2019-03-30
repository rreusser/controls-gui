var getElementHeight = require('./get-element-height');

module.exports = function toggleSlide (el, callback) {
  var elMaxHeightNumber = el.style.maxHeight.replace('px', '').replace('%', '');

  if (elMaxHeightNumber === '0') {
    var maxComputedHeight = getElementHeight(el) + 'px';

    el.style.transition = 'max-height 0.1s ease-in-out';
    el.style.overflowY = 'hidden';
    el.style.maxHeight = '0';
    el.style.display = 'block';

    var restore = function () {
      el.style.transition = 'none';
      el.style.overflowY = 'visible';
      el.style.maxHeight = '';
      el.removeEventListener('transitionend', restore);
      callback && callback();
    }

    el.addEventListener('transitionend', restore);

    setTimeout(function() {
      el.style.maxHeight = maxComputedHeight;
    }, 20);
  } else {
    var maxComputedHeight = getElementHeight(el) + 'px';

    el.style.transition = 'max-height 0.1s ease-in-out';
    el.style.overflowY = 'hidden';
    el.style.maxHeight = maxComputedHeight;
    el.style.display = 'block';

    var restore = function () {
      el.style.transition = 'none';
      el.removeEventListener('transitionend', restore);
      callback && callback();
    }
    el.addEventListener('transitionend', restore);

    setTimeout(function() {
      el.style.maxHeight = '0';
    }, 20);
  }
}
