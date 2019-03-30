var preact = require('preact');
var createClass = require('../util/preact-classless-component');
var h = preact.h;

module.exports = {
  name: 'color',
  component: createClass({
    render: function () {
      var field = this.props.field;
      var config = field.$config;
      var className = this.props.className;
      return h('div', {
        className: `${className}__field ${className}__field--color`,
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
              type: 'color',
              value: field.value,
              onInput: event => {
                this.props.field.value = event.target.value;
              }
            })
          ),
        )
      );
    }
  }),
  css: function (className, theme) {
    return `
      .${className}__field--color input[type=color] {
        margin: 0;
        border: 1px solid #aaa;
        width: 50px;
        height: ${theme.sliderHeight};
        border-radius: ${theme.controlBorderRadius};
        padding: 0;
      }

      .${className}__field--color input[type=color]::-webkit-color-swatch-wrapper {
        padding: 0px;
        background-color: #888;
      }

      .${className}__field--color input[type=color]:focus {
        ${theme.focusBorder}
      }
    `;
  }
};
