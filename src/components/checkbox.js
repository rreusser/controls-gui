var preact = require('preact');
var createClass = require('../util/preact-classless-component');
var h = preact.h;

module.exports = {
  name: 'checkbox',
  component: createClass({
    render: function () {
      var field = this.props.field;
      var config = field.$config;
      var className = this.props.className;
      return h('div', {
        className: `${className}__field ${className}__field--checkbox`,
      },
        h('label', {
          className: `${className}__label`,
          htmlFor: `${className}-${field.path}`,
        },
          h('span', {
            className: `${className}__labelText`,
          }, config.label || field.name),
          ' ',
          h('span', {className: `${className}__container`},
            h('input', {
              id: `${className}-${field.path}`,
              name: field.path,
              type: 'checkbox',
              checked: field.value,
              onInput: event => this.props.field.value = event.target.checked,
            })
          ),
        )
      );
    }
  }),
  css: function checkboxCSS (className, theme) {
    return `
      .${className}__field--checkbox input[type=checkbox] {
        height: 20px;
        width: 20px;
        margin-bottom: 0.2em;
      }

      .${className}__field--checkbox input[type=checkbox]:focus {
        ${theme.focusBorder}
      }
    `;
  }
};
