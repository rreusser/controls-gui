var preact = require('preact');
var toggleSlide = require('../util/toggle-slide');
var createClass = require('../util/preact-classless-component');
var h = preact.h;

module.exports = {
  name: 'section',
  component: createClass({
    init: function () {
      var expanded = this.props.field.$config.expanded;
      expanded = expanded === undefined ? true : !!expanded;
      this.state = {
        expanded: expanded,
      };
    },
    toggleCollapsed: function (event) {
      event.stopPropagation();

      toggleSlide(this.contentsEl);

      this.setState({expanded: !this.state.expanded});
    },
    getRef: function (ref) {
      this.contentsEl = ref;
      if (this.state.expanded === false) {
        toggleSlide(this.contentsEl);
      }
    },
    render: function () {
      var field = this.props.field;
      var config = field.$config;
      var title = config.label || field.name;
      var className = this.props.className;

      var hasWrapper = !field.parent || field.parent.type !== 'tabs'

      if (!field.parentField && !title) title = 'Controls'
      return h('fieldset', {
        className: `${className}__section ${this.state.expanded ? `${className}__section--expanded` : ''} ${hasWrapper ? `${className}__section--wrapped` : ''}`,
      }, 
        (hasWrapper) && (h('legend', {
          className: `${className}__sectionHeading`,
        }, 
          h('button', {onClick: this.toggleCollapsed}, title)
        )),
        h('div', {
          ref: this.getRef,
          className: `${className}__sectionFields`,
        },
          Object.keys(field.value.$displayFields).map(key => {
            return h(this.props.ControlComponent, {
              field: field.value.$path[key].$field
            })
          })
        ),
      );
    }
  }),
  css: function (className, theme) {
    return `
      .${className}__section {
        margin: 0;
        margin-top: -1px;
        padding: 0;
        border: none;
      }

      .${className}__sectionHeading {
        border: 1px solid ${theme.sectionHeadingBorderColor};
        position: relative;
        z-index: 1;
        box-sizing: border-box;
      }

      .${className}__section--wrapped > .${className}__sectionFields {
        margin-left: 4px;
      }

      .${className}__sectionFields {
        box-sizing: border-box;
      }

      .${className}__sectionFields .${className}__field {
        border-bottom: 1px solid ${theme.fieldBorderColor};
        box-sizing: border-box;
      }

      .${className}__sectionFields .${className}__sectionFields {
        border-right: none;
        margin-right: 0;
      }

      .${className} > .${className}__section:first-child > .${className}__sectionHeading:first-child {
        border-right: 1px solid ${theme.sectionHeadingBorderColor};
      }

      .${className}__sectionHeading {
        padding: 0;
        font-family: inherit;
        user-select: none;
        -moz-user-select: -moz-none;
        text-indent: 5px;
        cursor: pointer;
        width: 100%;

        color: ${theme.sectionHeadingColor};
        background-color: ${theme.sectionHeadingBgColor};
        height: ${theme.sectionHeadingHeight};
        line-height: ${theme.sectionHeadingHeight};
      }

      .${className}__sectionHeading button:focus {
        background-color: ${theme.sectionHeadingHoverColor};
      }

      .${className}__sectionHeading > button {
        height: 100%;
        vertical-align: middle;
        font-size: 1.0em;
        cursor: pointer;
        text-align: left;
        outline: none;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        background: transparent;
        border: none;
        border-radius: 0;
        display: block;
        width: 100%;
      }

      .${className}__sectionHeading:hover {
        background-color: ${theme.sectionHeadingHoverColor};
      }

      .${className}__sectionHeading > button::before {
        transform: translate(0, -1px) rotate(90deg);
      }

      .${className}__sectionHeading > button::before {
        content: '▲';
        display: inline-block;
        transform-origin: 50% 50%;
        margin-right: 0.5em;
        font-size: 0.5em;
        vertical-align: middle;
      }

      .${className}__section--expanded > .${className}__sectionHeading > button::before {
        transform: none;
        content: '▼';
      }
    `;
  }
};
