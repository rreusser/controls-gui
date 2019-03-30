var preact = require('preact');
var insertCSS = require('insert-css');
var defaults = require('defaults');

var createClass = require('./util/preact-classless-component');
var toPx = require('./util/to-px');
var defaultTheme = require('../themes/default');

module.exports = createGui;

var components = {};

function registerComponent (name, component) {
  components[component.name] = component;
}

function getComponent (name) {
  var component = components[name];
  if (!component) throw new Error('Unrecognized component, "'+name+'"');
  return component;
}

registerComponent('select', require('./components/select'));
registerComponent('section', require('./components/section'));
registerComponent('slider', require('./components/slider'));
registerComponent('checkbox', require('./components/checkbox'));
registerComponent('textinput', require('./components/textinput'));
registerComponent('button', require('./components/button'));
registerComponent('color', require('./components/color'));
registerComponent('raw', require('./components/raw'));

function createGui (state, opts) {
  opts = defaults(opts || {}, {
    containerCSS: "position:fixed;top:0;right:8px",
    style: true,
    className: `controlPanel-${Math.random().toString(36).substring(2, 15)}`,
  });

  var theme = Object.assign({}, defaults(opts.theme || {}, defaultTheme));
  var className = opts.className;

  theme.fontSize = toPx(theme.fontSize);
  theme.sliderHeight = toPx(theme.sliderHeight);
  theme.fieldHeight = toPx(theme.fieldHeight);
  theme.sectionHeadingHeight = toPx(theme.sectionHeadingHeight);
  theme.minLabelWidth = toPx(theme.minLabelWidth);
  theme.minControlWidth = toPx(theme.minControlWidth);
  theme.controlBorderRadius = toPx(theme.controlBorderRadius);
  theme.focusBorder = `
    outline: none;
    border-color: ${theme.focusBorderColor};
    box-shadow: 0 0 3px ${theme.focusBorderColor};
  `;


  var h = preact.h;
  var render = preact.render;

  var ControlComponent = createClass({
    render: function () {
      var props = {
        ControlComponent: ControlComponent,
        className: className,
        field: this.props.field,
        state: state,
      };

      return h(getComponent(this.props.field.type).component, props);
    }
  });

  var App = createClass({
    state: {
      dummy: 0,
    },
    componentDidMount: function () {
      this.props.state.$field.onChanges(updates => {
        this.setState({dummy: this.state.dummy + 1});
      });
    },
    getRef: function (c) {
      var eventList = ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchmove', 'touchend', 'wheel'];
      for (var i = 0; i < eventList.length; i++) {
        c.addEventListener(eventList[i], function (e) {
          e.stopPropagation();
        });
      }
      if (opts.containerCSS) {
        c.style.cssText = opts.containerCSS;
      }
    },
    render: function () {
      return h('div', {
          className: `${className}`,
          ref: this.getRef,
        }, h(ControlComponent, {field: this.props.state.$field})
      );
    }
  });

  if (opts.style) {
    insertCSS(`
      .${className} {
        color: ${theme.fontColor};
        ${theme.fontSize ? `font-size: ${theme.fontSize}` : ''};
        ${theme.fontFamily ? `font-family: ${theme.fontFamily}` : ''};
      }

      .${className}__field {
        position: relative;
        background-color: ${theme.fieldBgColor};
        border-right: 1px solid ${theme.fieldBorderColor};
      }

      .${className}__label {
        display: block;
        height: ${theme.fieldHeight};
        line-height: ${theme.fieldHeight};
        display: flex;
        flex-direction: row;
        background-color: ${theme.fieldBgColor};
      }

      .${className}__field:hover {
        background-color: ${theme.fieldHoverColor};
      }

      .${className}__container {
        display: flex;
        flex-direction: row;
        align-content: stretch;
        justify-content: stretch;
      
        height: ${theme.fieldHeight};
        flex: 1;
        position: relative;
        align-items: center;
        position: relative;

        min-width: ${theme.minControlWidth};
        width: ${theme.fieldHeight};
        padding-right: 8px;
        text-indent: 8px;
      }

      .${className}__value {
        position: absolute;
        pointer-events: none;
        top: 0;
        z-index: 11;
        line-height: ${theme.fieldHeight};
        height: ${theme.fieldHeight};
        display: inline-block;
        right: 15px;
        text-shadow:  1px  0   ${theme.visibilityFontColor},
                      0    1px ${theme.visibilityFontColor},
                     -1px  0   ${theme.visibilityFontColor},
                      0   -1px ${theme.visibilityFontColor},
                      1px  1px ${theme.visibilityFontColor},
                      1px -1px ${theme.visibilityFontColor},
                     -1px  1px ${theme.visibilityFontColor},
                     -1px -1px ${theme.visibilityFontColor};
      }


      .${className}__labelText {
        user-select: none;
        -moz-user-select: -moz-none;
        text-indent: 8px;
        margin-right: 4px;
        display: inline-block;
        min-width: ${theme.minLabelWidth};
        line-height: ${theme.fieldHeight};
      }

      .${className}__field::before {
        content: '';
        width: 3px;
        display: inline-block;
        vertical-align: middle;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
      }

      .${className}__field--text::before { background-color: #49f; }
      .${className}__field--color::before { background-color: #94f; }
      .${className}__field--checkbox::before { background-color: #f49; }
      .${className}__field--slider::before { background-color: #f84; }
      .${className}__field--select::before { background-color: #8f4; }
      .${className}__field--button > button::before { background-color: #8ff; }

      ${Object.keys(components).map(name => {
        var css = getComponent(name).css;
        if (!css) return '';
        return css(className, theme);
      }).join('\n')}
    `);
  }

  render(h(App, {
    state: state.$field.value,
  }), opts.root || document.body);

  return state;
}

