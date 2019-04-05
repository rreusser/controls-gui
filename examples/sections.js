var wrapGui = require('../index');
var Controls = require('../../controls-state/src/index');
var h = require('h');
var beautify = require('json-beautify');

var fullState = window.fullState = wrapGui(
  Controls({
    foo: Controls.Tabs({
      group1: Controls.Section({
        color: '#4499ff',
        size: 14
      }, {label: 'Group 1'}),
      group2: Controls.Section({
        color: '#99ff44',
        size: 17
      }, {label: 'Group 2'}),
      color1: '#99ff44',
    })
  }),
  {containerCSS: false}
)
