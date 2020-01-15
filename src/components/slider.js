var preact = require('preact');
var createClass = require('../util/preact-classless-component');
var h = preact.h;

module.exports = {
  name: 'slider',
  component: createClass({
    render: function () {
      var field = this.props.field;
      var config = field.$config;
      var className = this.props.className;
      return h('div', {
        className: `${className}__field ${className}__field--slider`,
      },
        h('label', {
          className: `${className}__label`,
          htmlFor: `${className}-${field.path}`
        },
          h('span', {
            className: `${className}__labelText`,
          }, config.label || field.name),
          ' ',
          h('span', {className: `${className}__container`},
            h('input', {
              id: `${className}-${field.path}`,
              name: field.path,
              type: 'range',
              min: this.props.field.inverseMapping(field.min),
              max: this.props.field.inverseMapping(field.max),
              step: (this.props.field.inverseMapping(this.props.field.max) - this.props.field.inverseMapping(this.props.field.min)) / this.props.field.steps,
              value: this.props.field.inverseMapping(field.value),
              onInput: event => this.props.field.value = parseFloat(this.props.field.mapping(event.target.value))
            }),
            h('span', {className: `${className}__sliderValue`}, field.value.toFixed(4).replace(/\.?0*$/,'')) )
        )
      );
    }
  }),
  css: function sliderCSS (className, theme) {
    return `
      .${className}__field--slider input[type=range] {
        width: 100%;
        height: ${theme.sliderHeight};
        -webkit-appearance: none;
        vertical-align: middle;
        border-radius: ${theme.controlBorderRadius};
        margin: 0;
        cursor: resize-ew;
        border: 1px solid ${theme.controlBorderColor};
      }

      .${className}__field--slider input[type=range]:focus {
        ${theme.focusBorder}
      }

      .${className}__field--slider input[type=range]::-webkit-slider-thumb {
        height: ${theme.sliderHeight};
        width: ${theme.sliderHeight};
        background: ${theme.sliderThumbColor};
        border-radius: 0;
        cursor: ew-resize;
        -webkit-appearance: none;
      }

      .${className}__field--slider input[type=range]::-moz-range-thumb {
        height: ${theme.sliderHeight};
        width: ${theme.sliderHeight};
        border-radius: 0;
        background: ${theme.sliderThumbColor};
        cursor: ew-resize;
      }

      .${className}__field--slider input[type=range]::-ms-thumb {
        height: ${theme.sliderHeight};
        width: ${theme.sliderHeight};
        border-radius: 0;
        background: ${theme.sliderThumbColor};
        cursor: ew-resize;
      }

      .${className}__field--slider input[type=range]::-webkit-slider-runnable-track {
        height: ${theme.sliderHeight};
        cursor: ew-resize;
        background: ${theme.controlBgColor};
      }

      .${className}__field--slider input[type=range]::-moz-range-track {
        height: ${theme.sliderHeight};
        cursor: ew-resize;
        background: ${theme.controlBgColor};
      }

      .${className}__field--slider input[type=range]::-ms-track {
        height: ${theme.sliderHeight};
        cursor: ew-resize;
        background: transparent;
        border-color: transparent;
        color: transparent;
      }

      .${className}__field--slider input[type=range]::-ms-fill-lower {
        background: ${theme.controlBgColor};
      }

      .${className}__field--slider input[type=range]::-ms-fill-upper {
        background: ${theme.controlBgColor};
      }

      .${className}__field--slider input[type=range]:focus::-ms-fill-lower {
        background: ${ theme.controlBgColor };
        ${theme.focusBorder}
      }

      .${className}__field--slider input[type=range]:focus::-ms-fill-upper {
        background: ${ theme.controlBgColor };
        ${theme.focusBorder}
      }

      .${className}__sliderValue {
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
    `;
  }
};
