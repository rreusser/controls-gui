var wrapGui = require('../index');
var Controls = require('../../controls-state');
var h = wrapGui.preact.h;

var hello = wrapGui.preact.createClass({
  render: function () {
    return h('p', null, 'Hi');
  },
});

wrapGui(Controls.Raw(h(hello)));
