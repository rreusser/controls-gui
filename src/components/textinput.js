var preact = require('preact');
var createClass = require('../util/preact-classless-component');
var h = preact.h;

module.exports = {
  name: 'textinput',
  component: createClass({
    render: function () {
      var field = this.props.field;
      var config = field.$config;
      var className = this.props.className;
      return h('div', {
        className: `${className}__field ${className}__field--text`,
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
              type: 'text',
              value: field.value,
              onInput: event => this.props.field.value = event.target.value,
            })
          )
        )
      );
    }
  }),
  css: function (className, theme) {
    return `
      .${className}__field--text input[type=text] {
        font-size: inherit;
        font-family: inherit;
        width: 100%;
        margin: 0;
        padding: 0 5px;
        border: none;
        height: ${theme.sliderHeight};
        border-radius: ${theme.controlBorderRadius};
        background-color: ${theme.controlBgColor};
        border: 1px solid ${theme.controlBorderColor};
        color: inherit;
      }

      .${className}__field--text input[type=text]:focus {
        ${theme.focusBorder}
      }
    `;
  }
};
