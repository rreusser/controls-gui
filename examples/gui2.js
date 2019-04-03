var wrapGui = require('../index');
var Controls = require('../../controls-state');
var h = require('h');
var beautify = require('json-beautify');

var FONT_FAMILY = 'Fira Sans Condensed';

var fontStyle = document.createElement('style');
fontStyle.setAttribute('type', 'text/css');
document.querySelector('head').appendChild(fontStyle);
fontStyle.textContent = `
  @import url('https://fonts.googleapis.com/css?family=${FONT_FAMILY.replace(/ /g, '+')}');
`;

require('insert-css')(`
.docs {
  max-width: 600px;
  margin: 15px;
  font-family: 'Helvetica', sans-serif;
}

.docs pre {
  background-color: #eee;
  margin-left: 15px;
  padding: 15px;
}

.myControlPanel {
  position: fixed;
  top: 0;
  right: 10px;
  z-index: 1;
}

.myControlPanel2 {
  width: 400px;
}
`);


var controls = window.controls = Controls({
  foo: Controls.Slider(50),
  bar: Controls.Slider(80)
});

var gui1 = wrapGui(controls.$path.foo, {style: false, containerCSS: null});
var gui2 = wrapGui(controls.$path.bar, {style: false, containerCSS: null});
