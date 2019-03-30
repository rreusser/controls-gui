module.exports = function toPx (number) {
  number = '' + number;
  return /^[0-9\.\s]*$/.test(number) ? number + 'px' : number;
}
