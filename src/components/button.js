var preact = require('preact');
var createClass = require('../util/preact-classless-component');
var h = preact.h;

module.exports = {
  name: 'button',
  component: createClass({
    render: function () {
      var field = this.props.field;
      var config = field.$config;
      var className = this.props.className;
      return h('div', {
        className: `${className}__field ${className}__field--button`
      },
        h('button', {
          onClick: field.value,
        }, config.label || field.name),
      );
    }
  }),
  css: function (className, theme) {
    return `
      .${className}__field--button button {
        height: ${theme.fieldHeight};
        font-size: inherit;
        font-family: inherit;
        outline: none;
        cursor: pointer;
        text-align: center;
        display: block;
        background: transparent;
        color: inherit;
        font-size: 1.0em;
        width: 100%;
        border: none;
        border-radius: 0;
      }

      .${className}__field--button > button:hover {
        background-color: ${theme.fieldHoverColor};
      }

      .${className}__field--button > button:active {
        background-color: ${theme.fieldActiveColor};
      }

      .${className}__field--button > button:focus {
        ${theme.focusBorder}
      }

      .${className}__field--button > button::before {
        content: '';
        width: 3px;
        display: inline-block;
        vertical-align: middle;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
      }
    `;
  }
};
