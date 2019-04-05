var wrapGui = require('../index');
var Controls = require('../../controls-state');
var h = require('h');
var beautify = require('json-beautify');

var fullState = window.fullState = Controls({
  group1: Controls.Section({
    color: '#ff9944',
    size: 14
  }, {label: 'Group 1'}),
  group2: Controls.Section({
    color: '#9944ff',
    size: 17
  }, {label: 'Group 2'}),
})

wrapGui(fullState.group1, {containerCSS: "position:fixed;top:0;left:0"})
wrapGui(fullState.group2, {containerCSS: "position:fixed;top:0;right:0"})


var pre = h('pre', {style: {'margin-top': '10em'}}, beautify(fullState, null, 2, 0));

fullState.$onChanges(function () {
  pre.textContent = beautify(fullState, null, 2, 0);
});

document.body.appendChild(pre);

wrapGui(fullState, {containerCSS: "max-width:400px"});
